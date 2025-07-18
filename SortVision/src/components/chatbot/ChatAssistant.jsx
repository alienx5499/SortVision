import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAlgorithmState } from "@/context/AlgorithmState";
import { useAudio } from "@/hooks/useAudio";
import { useMobileOverlay } from "@/components/MobileOverlay";
import { processMessage } from "./assistantEngine";
import ChatButton from "./ChatButton";
import ChatModal from "./ChatModal";

export default function ChatAssistant({ isOpen: isOpenProp, onClose }) {
    const [isOpenState, setIsOpenState] = useState(false);
    const isOpen = typeof isOpenProp === 'boolean' ? isOpenProp : isOpenState;
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingInterval, setTypingInterval] = useState(null);
    const [errorCount, setErrorCount] = useState(0);
    
    const { getContextObject, addToHistory } = useAlgorithmState();
    const { playTypingSound, isAudioEnabled } = useAudio();
    const { isMobileOverlayVisible } = useMobileOverlay();

    const messagesEndRef = useRef(null);
    const lastTypingSoundRef = useRef(0);

    // Initialize with welcome message
    useEffect(() => {
        console.log("✅ ChatAssistant mounted");
        
        // Add welcome message with delay
        const timer = setTimeout(() => {
            setMessages([{
                role: "model",
                content: "Hello! I'm SortBot, your sorting algorithm assistant. How can I help you today?"
            }]);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ 
                behavior: "smooth",
                block: "end"
            });
        };
        
        if (messages.length > 0) {
            scrollToBottom();
            // Double-check scroll position after any images/content loads
            setTimeout(scrollToBottom, 100);
        }
    }, [messages]);

    // Clean up typing interval on unmount
    useEffect(() => {
        return () => {
            if (typingInterval) {
                clearInterval(typingInterval);
            }
        };
    }, [typingInterval]);

    // Handle chat open/close with animation
    const toggleChat = useCallback(() => {
        if (typeof isOpenProp === 'boolean') {
            if (isOpenProp && onClose) onClose();
            else if (!isOpenProp && onClose) onClose();
        } else {
            setIsOpenState(prev => !prev);
        }
        if (!isOpen) {
            // Enable audio interaction
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
            
            // Reset error count on new session
            setErrorCount(0);
        }
    }, [isOpen, isOpenProp, onClose]);

    // Enhanced message display with typing animation
    const displayMessageWithTyping = useCallback((text, userInput) => {
        let displayed = "";
        let i = 0;
        
        setIsTyping(true);
        setMessages(prev => [...prev, { role: "model", content: "" }]);

        const interval = setInterval(() => {
            const now = Date.now();
            
            if (i < text.length) {
                // Play typing sound with rate limiting
                if (now - lastTypingSoundRef.current >= 200 && isAudioEnabled) {
                    playTypingSound();
                    lastTypingSoundRef.current = now;
                }

                displayed += text[i];
                i++;

                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    if (last.role === "model") {
                        return [...prev.slice(0, -1), { ...last, content: displayed }];
                    }
                    return prev;
                });
            } else {
                clearInterval(interval);
                setTypingInterval(null);
                setIsTyping(false);
                addToHistory({ question: userInput, answer: text });
            }
        }, 30);

        setTypingInterval(interval);
    }, [isAudioEnabled, playTypingSound, addToHistory]);

    // Enhanced error handling
    const handleError = useCallback((error) => {
        console.error("❌ Chat Error:", error);
        setErrorCount(prev => prev + 1);
        
        const errorMessage = errorCount > 2
            ? "I'm having trouble connecting. Please try again later or refresh the page."
            : "I encountered an error. Let me try to help you again.";
            
        setMessages(prev => [...prev, { 
            role: "error", 
            content: errorMessage
        }]);
        
        setIsTyping(false);
    }, [errorCount]);

    // Enhanced message sending with validation
    const handleSend = useCallback(async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        // Clear previous interval if exists
        if (typingInterval) {
            clearInterval(typingInterval);
            setTypingInterval(null);
        }

        setInput("");
        setMessages(prev => [...prev, { role: "user", content: trimmedInput }]);

        try {
            const context = getContextObject();
            console.log("🧠 Context passed to assistant:", context);

            const result = await processMessage(trimmedInput, context);

            if (result.type === "response") {
                displayMessageWithTyping(result.content, trimmedInput);
            } else {
                handleError(new Error("Invalid response type"));
            }
        } catch (error) {
            handleError(error);
        }
    }, [input, typingInterval, getContextObject, displayMessageWithTyping]);

    if (isMobileOverlayVisible) return null;

    return (
        <>
            <ChatButton isOpen={isOpen} onClick={toggleChat} />
            <ChatModal
                isOpen={isOpen}
                onClose={onClose ? onClose : () => setIsOpenState(false)}
                messages={messages}
                input={input}
                onInputChange={setInput}
                onSend={handleSend}
                messagesEndRef={messagesEndRef}
                isTyping={isTyping}
            />
        </>
    );
}