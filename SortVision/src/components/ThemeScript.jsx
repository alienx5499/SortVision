'use client';

import { initializeTheme } from "@/utils/themeUtils";
import { useEffect } from "react";

export function ThemeScript() {
    useEffect(() => {
        initializeTheme();
    }, []);
    
    return null;
}