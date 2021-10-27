import PropTypes from 'prop-types';
import styles from './Reviews.module.scss';

const Reviews = ({reviews}) => {
    return(
        reviews.length<1 ? <p className={styles.noReviews}>No reviews</p> 
        : <ul className={styles.reviewsContainer}>
             {reviews.map(review => (
                <li className={styles.review} key={review.id}>
                    <p className={styles.author}><span className={styles.title}>Author:</span> {review.author}</p>
                    <p className={styles.content}>{review.content}</p>
                </li>
             ))}
          </ul>
    )
}

Reviews.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }))
}

export default Reviews;