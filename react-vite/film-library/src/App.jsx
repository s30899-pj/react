import './App.css'

const FILMS = [
    {id: 1, title: 'Oppenheimer', year: 2023, genre: 'Dramat', rating: 5, watched: true},
    {id: 2, title: 'Dune: Część druga', year: 2024, genre: 'Sci-Fi', rating: 4, watched: false},
    {id: 3, title: 'Past Lives', year: 2023, genre: 'Romans', rating: 5, watched: true},
    {id: 4, title: 'Poor Things', year: 2023, genre: 'Komedia', rating: 4, watched: false},
];

function RatingStars({rating = 3}) {
    const fstar = "★";
    const estar = "☆";

    const prepareStars = (rating) => {
        return fstar.repeat(rating) + estar.repeat(5 - rating);
    };

    return <span>{prepareStars(rating)}</span>;
}

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

function WatchedBadge({watched}) {
    return !watched ? null : <span>✓ Obejrzany</span>
}

function FilmCard({title, year, genre, rating, watched}) {
    console.log('render:', title)
    return <div>
        <h3>{title} ({year})</h3>
        <GenreBadge genre={genre}/>
        <RatingStars rating={rating}/>
        <WatchedBadge watched={watched}/>
    </div>
}

function FilmList({title, films}) {
    return <>
        <h2>{title}</h2>
        {films.map(film => (<FilmCard key={film.id} {...film}/>))}
    </>
}

function App() {
    return (
        <>
            <FilmList title="Obejrzane" films={FILMS.filter(film => film.watched)}/>
            <FilmList title="Do obejrzenia" films={FILMS.filter(film => !film.watched)}/>
        </>
    )
}

export default App
