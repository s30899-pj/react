'use server'

import { z } from 'zod'
import { revalidateTag } from 'next/cache'
import { addFilm, deleteFilm } from '@/lib/db'

const filmSchema = z.object({
    title: z.string().min(2, 'Tytuł musi mieć co najmniej 2 znaki').max(100, 'Tytuł może mieć maksymalnie 100 znaków'),
    year: z.coerce.number().min(1888, 'Rok nie może być wcześniejszy niż 1888').max(2030, 'Rok nie może być późniejszy niż 2030'),
    genre: z.string().min(1, 'Gatunek jest wymagany'),
})

export async function createFilm(prevState, formData) {
    try {
        const data = {
            title: formData.get('title'),
            year: formData.get('year'),
            genre: formData.get('genre'),
        }

        const result = filmSchema.safeParse(data)

        if (!result.success) {
            return { status: 'error', errors: result.error.flatten().fieldErrors, message: 'Popraw błędy w formularzu' }
        }

        addFilm(result.data)
        revalidateTag('films', 'max')

        return { status: 'success', errors: null, message: 'Film został dodany' }
    } catch (e) {
        return { status: 'error', errors: null, message: 'Wystąpił błąd serwera' }
    }
}

export async function createFilmSimple(formData) {
    return createFilm(null, formData)
}

export async function deleteFilmAction(filmId) {
    deleteFilm(filmId)
    revalidateTag('films', 'max')
}
