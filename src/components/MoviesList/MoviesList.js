import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MoviesList.module.scss'

const MoviesList = ({ movies, location }) => {
  return (
    <ul className={styles.list}>
      {movies.map(({ id, title }) => (
        <li key={id} className={styles.item}>
          <Link
            className={styles.link}
            to={{
                pathname: `/movies/${id}`,
                state: { from: location },
            }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  location: PropTypes.object.isRequired,
};


export default withRouter(MoviesList);