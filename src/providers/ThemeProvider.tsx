"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes";

type ThemeProviderProps = {
    children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemeProvider
            attribute="class"
            enableSystem
        >
            {children}
        </NextThemeProvider>
    )
}

export default ThemeProvider;
