import { useState } from "react";
import { fetchMovieBySearch } from "../../services/movies-api";
import MoviesList from "../../components/MoviesList/MoviesList";
import styles from './MoviesPage.module.scss';

const MoviesPage = () => {

    const [filmCollection, setFilmCollection] = useState([]);
    const [error, setError] = useState(null);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (input === "") { return }
        const options = {query: input};
        setIsLoading(true);
        fetchMovieBySearch(options)
            .then(data => {
                setFilmCollection(data)
            })
            .catch(error=> setError(error))
            .finally(setIsLoading(false));
    }

    return(
        <>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <input className={styles.inputStyle} type="text" 
                        value={input} 
                        onChange={(evt)=>{setInput(evt.target.value)}}/>
                <button className={styles.button} type="submit">Search</button>
            </form>
  
            { isLoading ? <div>Loading...</div> : <MoviesList movies={filmCollection}/> }

        </>
    )
}

export default MoviesPage;