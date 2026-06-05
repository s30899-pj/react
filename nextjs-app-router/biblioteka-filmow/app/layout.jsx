import Providers from '@/context/Providers'
import Nav from '@/components/Nav'

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
        <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        <Providers>
            <Nav />
            <main style={{ padding: '24px' }}>{children}</main>
        </Providers>
        </body>
        </html>
    )
}
