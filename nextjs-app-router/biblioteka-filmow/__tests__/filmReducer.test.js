import { describe, test, expect } from '@jest/globals'
import { filmReducer, initialFilmState } from '@/reducers/filmReducer'

describe('filmReducer', () => {
    test('FETCH_START ustawia loading na true i czysci error', () => {
        const state = filmReducer({ ...initialFilmState, error: 'x' }, { type: 'FETCH_START' })
        expect(state.loading).toBe(true)
        expect(state.error).toBe(null)
    })

    test('FETCH_SUCCESS zapisuje filmy i wylacza loading', () => {
        const films = [{ id: 1, title: 'Oppenheimer', year: 2023 }]
        const state = filmReducer(initialFilmState, { type: 'FETCH_SUCCESS', payload: films })
        expect(state.films).toEqual(films)
        expect(state.loading).toBe(false)
    })

    test('FETCH_ERROR zapisuje error i wylacza loading', () => {
        const state = filmReducer(initialFilmState, { type: 'FETCH_ERROR', payload: 'blad' })
        expect(state.error).toBe('blad')
        expect(state.loading).toBe(false)
    })

    test('SET_QUERY ustawia query', () => {
        const state = filmReducer(initialFilmState, { type: 'SET_QUERY', payload: 'dune' })
        expect(state.query).toBe('dune')
    })

    test('TOGGLE_FAVORITE dodaje i usuwa ID', () => {
        const added = filmReducer(initialFilmState, { type: 'TOGGLE_FAVORITE', payload: 1 })
        expect(added.favorites).toEqual([1])
        const removed = filmReducer(added, { type: 'TOGGLE_FAVORITE', payload: 1 })
        expect(removed.favorites).toEqual([])
    })

    test('ADD_FILM dodaje film do tablicy', () => {
        const film = { id: 2, title: 'Dune', year: 2024 }
        const state = filmReducer(initialFilmState, { type: 'ADD_FILM', payload: film })
        expect(state.films).toContainEqual(film)
    })

    test('ADD_NOTIFICATION dodaje powiadomienie z id', () => {
        const state = filmReducer(initialFilmState, {
            type: 'ADD_NOTIFICATION',
            payload: { message: 'ok', type: 'success' },
        })
        expect(state.notifications).toHaveLength(1)
        expect(state.notifications[0].message).toBe('ok')
        expect(state.notifications[0].type).toBe('success')
        expect(state.notifications[0].id).toBeDefined()
    })

    test('DISMISS_NOTIFICATION usuwa powiadomienie po ID', () => {
        const withNotif = { ...initialFilmState, notifications: [{ id: 99, message: 'x', type: 'info' }] }
        const state = filmReducer(withNotif, { type: 'DISMISS_NOTIFICATION', payload: 99 })
        expect(state.notifications).toHaveLength(0)
    })

    test('nie mutuje stanu wejsciowego (immutability)', () => {
        const frozen = Object.freeze({ ...initialFilmState, favorites: Object.freeze([]) })
        expect(() => filmReducer(frozen, { type: 'TOGGLE_FAVORITE', payload: 1 })).not.toThrow()
        expect(frozen.favorites).toEqual([])
    })

    test('nieznana akcja rzuca Error', () => {
        expect(() => filmReducer(initialFilmState, { type: 'NIEZNANA' })).toThrow()
    })
})
