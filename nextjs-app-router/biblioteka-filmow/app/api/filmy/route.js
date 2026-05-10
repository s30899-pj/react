import { NextResponse } from 'next/server'
import { z } from 'zod'

let films = [
    { id: 1, title: 'Oppenheimer',       year: 2023, genre: 'Dramat'  },
    { id: 2, title: 'Dune: Czesc druga', year: 2024, genre: 'Sci-Fi'  },
    { id: 3, title: 'Past Lives',        year: 2023, genre: 'Romans'  },
    { id: 4, title: 'Poor Things',       year: 2023, genre: 'Komedia' },
]

const filmSchema = z.object({
    title: z.string().min(2),
    year: z.number().int().min(1888).max(2030),
    genre: z.string().min(1),
})

export function GET() {
    return NextResponse.json(films)
}

export async function POST(request) {
    const body = await request.json()
    const result = filmSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json({ errors: result.error.errors }, { status: 400 })
    }

    const newFilm = { id: films.length + 1, ...result.data }
    films.push(newFilm)

    return NextResponse.json(newFilm, { status: 201 })
}