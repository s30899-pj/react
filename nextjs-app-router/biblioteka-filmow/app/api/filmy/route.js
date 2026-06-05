import { NextResponse } from 'next/server'
import { getFilms, addFilm } from '@/lib/db'

export async function GET() {
    return NextResponse.json(getFilms())
}

export async function POST(request) {
    const body = await request.json()
    const newFilm = addFilm(body)
    return NextResponse.json(newFilm, { status: 201 })
}
