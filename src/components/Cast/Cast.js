import defaultPortrait from '../../pages/MovieDetailsPage/Anonymous-Mask-6.jpg';
import PropTypes from 'prop-types';
import styles from './Cast.module.scss';

const Cast = ({cast}) => {
    return(
        <ul className={styles.castContainer}>
            {cast.map(actor=> (
                <li className={styles.actorCard} key={actor.id}>
                    <img className={styles.actorPhoto} src={actor.profile_path? 
                        `https://image.tmdb.org/t/p/w300${actor.profile_path}` 
                        : defaultPortrait} 
                        alt={actor.name}/>
                    <div className={styles.actorInfo}>
                        <p className={styles.name}>{actor.name}</p>
                        <p><span className={styles.nameGap}>Character:</span>{actor.character}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

Cast.propTypes = {
    cast: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        profile_path: PropTypes.string,
        name: PropTypes.string.isRequired,
        character: PropTypes.string.isRequired
    }))
}

export default Cast;