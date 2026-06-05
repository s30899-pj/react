'use client'

export default function Error({ error, reset }) {
    return (
        <div>
            <h2>Coś poszło nie tak</h2>
            <p>{error.message}</p>
            <button onClick={() => reset()}>Spróbuj ponownie</button>
        </div>
    )
}
