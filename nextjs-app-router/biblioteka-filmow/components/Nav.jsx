'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFilmState } from '@/context/FilmContext'
import { useTheme } from '@/context/ThemeContext'

export default function Nav() {
    const pathname = usePathname()
    const { favorites } = useFilmState()
    const { theme, toggleTheme } = useTheme()

    const linkStyle = (href) => ({
        padding: '8px 16px',
        borderRadius: '4px',
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: pathname === href ? '700' : '400',
    })

    return (
        <nav style={{ display: 'flex', gap: '8px', padding: '16px', alignItems: 'center' }}>
            <Link href="/" style={linkStyle('/')}>Strona główna</Link>
            <Link href="/filmy" style={linkStyle('/filmy')}>Filmy</Link>
            <span style={{ marginLeft: 'auto' }}>Ulubione: {favorites.length}</span>
            <button onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Tryb ciemny' : '☀️ Tryb jasny'}
            </button>
        </nav>
    )
}
