'use client'

import Link from 'next/link'
import { useFilmState, useFilmDispatch } from '@/context/FilmContext'

export default function FilmyPage() {
    const { films, loading, error, query, favorites } = useFilmState()
    const dispatch = useFilmDispatch()

    const filtered = films.filter((f) =>
        f.title.toLowerCase().includes(query.toLowerCase())
    )

    const handleFavorite = (film) => {
        const isFavorite = favorites.includes(film.id)
        dispatch({ type: 'TOGGLE_FAVORITE', payload: film.id })
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                message: isFavorite ? 'Usunieto z ulubionych' : 'Dodano do ulubionych',
                type: 'info',
            },
        })
    }

    return (
        <div>
            <h1>Lista filmów</h1>
            <Link href="/filmy/dodaj">+ Dodaj film</Link>
            <div>
                <input
                    type="text"
                    placeholder="Szukaj po tytule..."
                    value={query}
                    onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
                />
            </div>
            {loading && <p>Ładowanie...</p>}
            {error && <p>Błąd: {error}</p>}
            {!loading && !error && (
                <ul>
                    {filtered.map((film) => (
                        <li key={film.id}>
                            <button onClick={() => handleFavorite(film)}>
                                {favorites.includes(film.id) ? '★' : '☆'}
                            </button>
                            <Link href={`/filmy/${film.id}`}>{film.title} ({film.year})</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
