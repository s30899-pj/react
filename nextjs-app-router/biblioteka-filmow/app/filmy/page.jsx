'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useFetch } from '@/hooks/useFetch'

export default function FilmyPage() {
    const [refreshKey, setRefreshKey] = useState(0)
    const [query, setQuery] = useState('')
    const searchRef = useRef(null)

    const { data: films, loading, error } = useFetch('/api/filmy?v=' + refreshKey)

    useEffect(() => {
        searchRef.current?.focus()
    }, [])

    const filtered = films
        ? films.filter((f) => f.title.toLowerCase().includes(query.toLowerCase()))
        : []

    return (
        <div>
            <h1>Lista filmów</h1>
            <Link href="/filmy/dodaj">Dodaj film</Link>
            <button onClick={() => setRefreshKey((prev) => prev + 1)}>Odśwież</button>
            <div>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Szukaj po tytule..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {loading && <p>Ładowanie...</p>}
            {error && <p>Błąd: {error.message}</p>}
            {!loading && !error && (
                <ul>
                    {filtered.map((film) => (
                        <li key={film.id}>
                            <Link href={`/filmy/${film.id}`}>{film.title} ({film.year})</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}