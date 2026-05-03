import { useEffect, useMemo, useState } from 'react';

export const useTypingSubtitle = (fullText: string) => {
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const resetTimer = setTimeout(() => setCharIndex(0), 0);
    return () => clearTimeout(resetTimer);
  }, [fullText]);

  useEffect(() => {
    if (charIndex < fullText.length) {
      const typingTimer = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(typingTimer);
    }
    return undefined;
  }, [charIndex, fullText]);

  const displayText = useMemo(
    () => fullText.slice(0, charIndex),
    [fullText, charIndex]
  );
  const isTypingComplete = charIndex >= fullText.length;
  return { displayText, isTypingComplete };
};
