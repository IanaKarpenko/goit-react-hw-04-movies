import { fetchMovies } from "../../services/movies-api";
import { useEffect, useState } from "react";
import Heading from '../../components/Heading/Heading';
import MoviesList from "../../components/MoviesList/MoviesList";
import styles from './HomePage.module.scss';

const HomePage = () => {

    const [filmCollection, setFilmCollection] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetchMovies()
            .then(movies =>{
                setFilmCollection(movies)
            })
            .catch(error => setError(null));
    }, [])

    return(
        <>
            <Heading title={'Trending today'} />
            
            { filmCollection.length===0 ? 
                <div className={styles.loader}>Loading...</div> 
                : <MoviesList movies={filmCollection}/> }
        </>
    )
}

export default HomePage;