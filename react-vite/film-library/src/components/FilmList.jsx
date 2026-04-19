import FilmCard from './FilmCard';

function FilmList({title, films}) {
    return <>
        <h2>{title}</h2>
        {films.map(film => (<FilmCard key={film.id} {...film}/>))}
    </>
}

export default FilmList;