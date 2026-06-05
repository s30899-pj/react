import { NextResponse } from 'next/server'
import { getFilm, deleteFilm } from '@/lib/db'

export async function GET(request, { params }) {
    const { id } = await params
    const film = getFilm(id)
    if (!film) {
        return NextResponse.json({ error: 'Nie znaleziono filmu' }, { status: 404 })
    }
    return NextResponse.json(film)
}

export async function DELETE(request, { params }) {
    const { id } = await params
    deleteFilm(id)
    return NextResponse.json({ success: true })
}
