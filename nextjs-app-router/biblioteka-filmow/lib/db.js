const initialFilms = [
    { id: 1, title: 'Oppenheimer', year: 2023, genre: 'Dramat' },
    { id: 2, title: 'Dune: Czesc druga', year: 2024, genre: 'Sci-Fi' },
    { id: 3, title: 'Past Lives', year: 2023, genre: 'Romans' },
]

let films = (globalThis.__films ??= initialFilms)

export function getFilms() {
    return [...films]
}

export function getFilm(id) {
    return films.find((f) => f.id === Number(id))
}

export function addFilm({ title, year, genre }) {
    const newFilm = { id: Date.now(), title, year, genre }
    films.push(newFilm)
    return newFilm
}

export function deleteFilm(id) {
    const index = films.findIndex((f) => f.id === Number(id))
    if (index !== -1) films.splice(index, 1)
}
