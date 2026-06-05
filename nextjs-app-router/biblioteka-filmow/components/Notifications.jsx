'use client'

import { useEffect } from 'react'
import { useFilmState, useFilmDispatch } from '@/context/FilmContext'

const colors = {
    success: '#16a34a',
    error: '#dc2626',
    info: '#2563eb',
}

function Notification({ notification }) {
    const dispatch = useFilmDispatch()

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: 'DISMISS_NOTIFICATION', payload: notification.id })
        }, 3000)
        return () => clearTimeout(timer)
    }, [notification.id, dispatch])

    return (
        <div
            style={{
                backgroundColor: colors[notification.type] || colors.info,
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '4px',
                marginBottom: '8px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
            }}
        >
            <span>{notification.message}</span>
            <button onClick={() => dispatch({ type: 'DISMISS_NOTIFICATION', payload: notification.id })}>
                ×
            </button>
        </div>
    )
}

export default function Notifications() {
    const { notifications } = useFilmState()

    return (
        <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 1000 }}>
            {notifications.map((n) => (
                <Notification key={n.id} notification={n} />
            ))}
        </div>
    )
}
