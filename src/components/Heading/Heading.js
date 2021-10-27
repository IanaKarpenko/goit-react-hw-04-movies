import PropTypes from 'prop-types';
import styles from './Heading.module.scss';

const Heading = ({title}) => {
    return(
        <h1 className={styles.header}>{title}</h1>
    )
}

Heading.propTypes = {
    title: PropTypes.string.isRequired
}

export default Heading;