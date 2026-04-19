function RatingStars({rating = 3}) {
    const fstar = "★";
    const estar = "☆";

    const prepareStars = (rating) => {
        return fstar.repeat(rating) + estar.repeat(5 - rating);
    };

    return <span>{prepareStars(rating)}</span>;
}

export default RatingStars;