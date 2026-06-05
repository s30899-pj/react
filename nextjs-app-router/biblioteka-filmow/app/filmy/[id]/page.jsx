import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function FilmPage({ params }) {
    const { id } = await params
    const res = await fetch(`http://localhost:3000/api/filmy/${id}`, { next: { tags: ['films'] } })
    if (!res.ok) notFound()
    const film = await res.json()

    return (
        <div>
            <h1>{film.title}</h1>
            <p>Rok: {film.year}</p>
            <p>Gatunek: {film.genre}</p>
            <Link href="/filmy">Wróć do listy</Link>
        </div>
    )
}
