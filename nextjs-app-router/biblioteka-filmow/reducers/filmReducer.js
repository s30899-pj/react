export const initialFilmState = {
    films: [],
    loading: true,
    error: null,
    query: '',
    favorites: [],
    notifications: [],
}

export function filmReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null }
        case 'FETCH_SUCCESS':
            return { ...state, films: action.payload, loading: false }
        case 'FETCH_ERROR':
            return { ...state, error: action.payload, loading: false }
        case 'SET_QUERY':
            return { ...state, query: action.payload }
        case 'TOGGLE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.includes(action.payload)
                    ? state.favorites.filter((id) => id !== action.payload)
                    : [...state.favorites, action.payload],
            }
        case 'ADD_FILM':
            return { ...state, films: [...state.films, action.payload] }
        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    { id: Date.now(), message: action.payload.message, type: action.payload.type },
                ],
            }
        case 'DISMISS_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter((n) => n.id !== action.payload),
            }
        default:
            throw new Error('Nieznana akcja: ' + action.type)
    }
}
