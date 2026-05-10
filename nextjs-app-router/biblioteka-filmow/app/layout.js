'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Nav() {
    const pathname = usePathname()

    const linkStyle = (href) => ({
        padding: '8px 16px',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: pathname === href ? '700' : '400',
        color: pathname === href ? '#fff' : '#ccc',
        backgroundColor: pathname === href ? '#333' : 'transparent',
    })

    return (
        <nav style={{ display: 'flex', gap: '8px', padding: '16px', backgroundColor: '#111' }}>
            <Link href="/" style={linkStyle('/')}>Strona główna</Link>
            <Link href="/filmy" style={linkStyle('/filmy')}>Filmy</Link>
        </nav>
    )
}

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
        <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <Nav />
        <main style={{ padding: '24px' }}>
            {children}
        </main>
        </body>
        </html>
    )
}