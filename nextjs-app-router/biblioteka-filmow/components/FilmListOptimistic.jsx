'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteFilmAction } from '@/actions/filmActions'

export default function FilmListOptimistic({ films }) {
    const [optimisticFilms, removeOptimisticFilm] = useOptimistic(films, (state, id) =>
        state.filter((f) => f.id !== id)
    )
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = (id) => {
        startTransition(async () => {
            removeOptimisticFilm(id)
            await deleteFilmAction(id)
            router.refresh()
        })
    }

    return (
        <ul>
            {optimisticFilms.map((film) => (
                <li key={film.id}>
                    {film.title} ({film.year}) - {film.genre}
                    <button onClick={() => handleDelete(film.id)} disabled={isPending}>X</button>
                </li>
            ))}
        </ul>
    )
}
