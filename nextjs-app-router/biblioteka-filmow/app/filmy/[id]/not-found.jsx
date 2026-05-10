import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <h2>Film nie został znaleziony</h2>
            <Link href="/filmy">Wróć do listy filmów</Link>
        </div>
    )
}
