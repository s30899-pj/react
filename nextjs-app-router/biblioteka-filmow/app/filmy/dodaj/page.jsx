'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createFilm } from '@/actions/filmActions'
import SubmitButton from '@/components/SubmitButton'

const initialState = { status: null, errors: null, message: null }

export default function DodajFilmPage() {
    const [state, formAction] = useActionState(createFilm, initialState)
    const router = useRouter()

    useEffect(() => {
        if (state.status === 'success') {
            router.push('/filmy')
        }
    }, [state.status, router])

    return (
        <div>
            <h1>Dodaj film</h1>
            {state.message && (
                <p style={{ color: state.status === 'success' ? 'green' : 'red' }}>{state.message}</p>
            )}
            <form action={formAction}>
                <div>
                    <label>Tytuł</label>
                    <input name="title" type="text" />
                    {state.errors?.title && <p style={{ color: 'red' }}>{state.errors.title[0]}</p>}
                </div>
                <div>
                    <label>Rok</label>
                    <input name="year" type="number" />
                    {state.errors?.year && <p style={{ color: 'red' }}>{state.errors.year[0]}</p>}
                </div>
                <div>
                    <label>Gatunek</label>
                    <select name="genre" defaultValue="">
                        <option value="" disabled>Wybierz gatunek...</option>
                        <option value="Dramat">Dramat</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Komedia">Komedia</option>
                        <option value="Horror">Horror</option>
                    </select>
                    {state.errors?.genre && <p style={{ color: 'red' }}>{state.errors.genre[0]}</p>}
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}
