'use client'

import { useFilmState, useFilmDispatch } from '@/context/FilmContext'

export default function FavoriteButton({ id }) {
    const { favorites } = useFilmState()
    const dispatch = useFilmDispatch()
    const isFavorite = favorites.includes(id)

    const handleClick = () => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: id })
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                message: isFavorite ? 'Usunieto z ulubionych' : 'Dodano do ulubionych',
                type: 'info',
            },
        })
    }

    return (
        <button onClick={handleClick}>
            {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        </button>
    )
}
