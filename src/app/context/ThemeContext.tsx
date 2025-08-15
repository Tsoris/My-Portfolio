"use client"
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark"

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children} : {children : React.ReactNode}) => {
    const [theme, setThemeState] = useState<Theme>("light");
    const [mounted, setMounted] = useState (false)
    
    //update the theme
    const setTheme = (newTheme : Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    }

    //toggle the theme

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    //intialize theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const initalTheme = savedTheme || systemTheme;

        setThemeState(initalTheme);
        document.documentElement.classList.toggle("dark", initalTheme ==="dark");
        setMounted(true);
    }, [])

    //prevent flash of wrong theme
    if(!mounted) {
        return null; 
    } 

    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

// use custom hook to use the ThemeContext
export function useTheme(){
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error ("useTheme must be used within a ThemeProdiver");
    }

    return context;
}