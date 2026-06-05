'use client'

import { useRouter } from 'next/navigation'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useFilmDispatch } from '@/context/FilmContext'

const validationSchema = Yup.object({
    title: Yup.string().min(2, 'Tytuł musi mieć co najmniej 2 znaki').required('Tytuł jest wymagany'),
    year: Yup.number()
        .integer('Rok musi być liczbą całkowitą')
        .min(1888, 'Rok nie może być wcześniejszy niż 1888')
        .max(2030, 'Rok nie może być późniejszy niż 2030')
        .required('Rok jest wymagany'),
    genre: Yup.string().required('Gatunek jest wymagany'),
})

export default function DodajFilmPage() {
    const router = useRouter()
    const dispatch = useFilmDispatch()

    return (
        <div>
            <h1>Dodaj film</h1>
            <Formik
                initialValues={{ title: '', year: '', genre: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    try {
                        const res = await fetch('/api/filmy', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ...values, year: Number(values.year) }),
                        })
                        if (!res.ok) throw new Error('Nie udało się dodać filmu')
                        const newFilm = await res.json()
                        dispatch({ type: 'ADD_FILM', payload: newFilm })
                        dispatch({
                            type: 'ADD_NOTIFICATION',
                            payload: { message: 'Film dodany', type: 'success' },
                        })
                        router.push('/filmy')
                    } catch (err) {
                        dispatch({
                            type: 'ADD_NOTIFICATION',
                            payload: { message: err.message, type: 'error' },
                        })
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label>Tytuł</label>
                            <Field name="title" />
                            {touched.title && errors.title && <p>{errors.title}</p>}
                        </div>
                        <div>
                            <label>Rok</label>
                            <Field name="year" type="number" />
                            {touched.year && errors.year && <p>{errors.year}</p>}
                        </div>
                        <div>
                            <label>Gatunek</label>
                            <Field name="genre" />
                            {touched.genre && errors.genre && <p>{errors.genre}</p>}
                        </div>
                        <button type="submit">Dodaj</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
