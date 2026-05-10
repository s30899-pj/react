'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { useFetch } from '@/hooks/useFetch'
import FavoriteButton from './FavoriteButton'

export default function FilmPage({ params }) {
    const { id: rawId } = use(params)
    const id = Number(rawId)

    const { data: films, loading, error } = useFetch('/api/filmy')

    if (loading) return <p>Ładowanie...</p>
    if (error) return <p>Błąd: {error.message}</p>

    const film = films.find((f) => f.id === id)
    if (!film) notFound()

    return (
        <div>
            <h1>{film.title}</h1>
            <p>Rok: {film.year}</p>
            <p>Gatunek: {film.genre}</p>
            <FavoriteButton />
        </div>
    )
}