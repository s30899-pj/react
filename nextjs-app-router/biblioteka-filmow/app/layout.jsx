import { ThemeProvider } from '@/context/ThemeContext'
import { FilmProvider } from '@/context/FilmContext'
import ThemeWrapper from '@/components/ThemeWrapper'
import Nav from '@/components/Nav'
import Notifications from '@/components/Notifications'

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
        <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        <ThemeProvider>
            <FilmProvider>
                <ThemeWrapper>
                    <Nav />
                    <Notifications />
                    <main style={{ padding: '24px' }}>{children}</main>
                </ThemeWrapper>
            </FilmProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
