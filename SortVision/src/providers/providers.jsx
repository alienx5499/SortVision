'use client';

import { ThemeProvider } from "@/context/ThemeContext";
import { initializeTheme } from "@/utils/themeUtils";
import { useEffect } from "react";

export function Providers({ children }) {

    useEffect(() => {
        initializeTheme();
    }, []);

    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}