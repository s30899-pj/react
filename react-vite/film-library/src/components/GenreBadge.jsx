function GenreBadge({genre}) {
    const genreColors = {
        'Dramat': 'red',
        'Sci-Fi': 'green',
        'Romans': 'blue',
        'Komedia': 'purple',
    }

    const color = genreColors[genre] ?? 'gray'

    return <span style={{backgroundColor: color}}>{genre}</span>
}

export default GenreBadge;