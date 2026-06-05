'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FilmSearch({ films }) {
    const [query, setQuery] = useState('')

    const filtered = films.filter((f) =>
        f.title.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div>
            <input
                type="text"
                placeholder="Szukaj po tytule..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p>Znaleziono: {filtered.length} z {films.length}</p>
            <ul>
                {filtered.map((film) => (
                    <li key={film.id}>
                        <Link href={`/filmy/${film.id}`}>{film.title} ({film.year})</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
