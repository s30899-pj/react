export default function Loading() {
    const box = {
        height: '40px',
        backgroundColor: '#ccc',
        borderRadius: '4px',
        marginBottom: '8px',
    }

    return (
        <div>
            <p>Ładowanie filmów...</p>
            <div style={box} />
            <div style={box} />
            <div style={box} />
        </div>
    )
}
