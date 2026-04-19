import GenreBadge from "./GenreBadge.jsx";
import RatingStars from "./RatingStars.jsx";
import WatchedBadge from "./WatchedBadge.jsx";

function FilmCard({title, year, genre, rating, watched}) {
    console.log('render:', title)
    return <div>
        <h3>{title} ({year})</h3>
        <GenreBadge genre={genre}/>
        <RatingStars rating={rating}/>
        <WatchedBadge watched={watched}/>
    </div>
}

export default FilmCard;