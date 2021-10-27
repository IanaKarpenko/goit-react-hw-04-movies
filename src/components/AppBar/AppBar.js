import { NavLink } from "react-router-dom";
import styles from './AppBar.module.scss';

const AppBar = () => {
    return(
        <nav className={styles.navBar}>
            <NavLink to="/" className={styles.link} activeClassName={styles.activeLink} exact>Home</NavLink>
            <NavLink to="/movies" className={styles.link} activeClassName={styles.activeLink}>Movies</NavLink>
        </nav>
    )
}

export default AppBar;