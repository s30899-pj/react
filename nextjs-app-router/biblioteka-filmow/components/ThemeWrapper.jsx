'use client'

import { useTheme } from '@/context/ThemeContext'

export default function ThemeWrapper({ children }) {
    const { theme } = useTheme()

    const styles =
        theme === 'dark'
            ? { backgroundColor: '#1a1a1a', color: '#fff' }
            : { backgroundColor: '#fff', color: '#1a1a1a' }

    return <div style={{ ...styles, minHeight: '100vh' }}>{children}</div>
}
