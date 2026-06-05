'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === null) throw new Error('useTheme musi byc uzyte wewnatrz Providers')
    return context
}

export default function Providers({ children }) {
    const [theme, setTheme] = useState('light')

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }, [])

    const styles =
        theme === 'dark'
            ? { backgroundColor: '#1a1a1a', color: '#fff' }
            : { backgroundColor: '#fff', color: '#1a1a1a' }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={{ ...styles, minHeight: '100vh' }}>{children}</div>
        </ThemeContext.Provider>
    )
}
