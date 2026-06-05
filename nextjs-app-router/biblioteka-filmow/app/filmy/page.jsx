import Link from 'next/link'
import FilmSearch from '@/components/FilmSearch'
import FilmListOptimistic from '@/components/FilmListOptimistic'

export const revalidate = 60

export default async function FilmyPage() {
    const res = await fetch('http://localhost:3000/api/filmy', { next: { tags: ['films'] } })
    if (!res.ok) throw new Error('Nie udało się pobrać filmów')
    const films = await res.json()

    return (
        <div>
            <h1>Lista filmów ({films.length})</h1>
            <Link href="/filmy/dodaj">+ Dodaj film</Link>
            <FilmSearch films={films} />
            <FilmListOptimistic films={films} />
        </div>
    )
}
