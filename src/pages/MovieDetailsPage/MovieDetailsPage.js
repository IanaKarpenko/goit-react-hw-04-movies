import { useEffect, useState } from "react";
import { NavLink, useParams, useRouteMatch, Route, withRouter } from "react-router-dom";
import { fetchMovieDetails } from "../../services/movies-api";
import Heading from "../../components/Heading/Heading";
import defaultPoster from './Anonymous-Mask-6.jpg';
import styles from './MovieDetailsPage.module.scss';
import { Suspense, lazy } from 'react';

const Cast = lazy(()=>
    import('../../components/Cast/Cast' /* webpackChunkName: "cast" */));

const Reviews = lazy(()=>
    import('../../components/Reviews/Reviews' /* webpackChunkName: "reviews" */));

const MovieDetailsPage = ({location, history}) => {

    const [film, setFilm] = useState(null);
    const [error, setError] = useState(null);
    const url = useRouteMatch();
    const { movieId, language } = useParams();

    useEffect(()=>{
        const options = { movieId: movieId, language: language};
        fetchMovieDetails(options)
            .then(movie => setFilm(movie))
            .catch(error => setError(error));
    }, []);

    const handledData = {};
    if (film) {
        film.poster_path ? 
            handledData.posterURL = `https://image.tmdb.org/t/p/w300${film.poster_path}` 
            : handledData.posterURL = defaultPoster;
        handledData.title = film.original_title;
        handledData.year = film.release_date.substring(0,4);
        film.vote_average ? 
            handledData.userScore = film.vote_average * 10 + '%'
            : handledData = 'N/A';
        handledData.overview = film.overview;
        handledData.genres = film.genres;
        handledData.cast = film.credits.cast;
        handledData.reviews = film.reviews.results;
    }

    const handleGoBack = () => {
        history.push(location?.state?.from || '/movies');
    }

    return(
        !film ? 
        <div className={styles.loader}>Loading...</div> 
        :<div className={styles.container}>
            <button className={styles.button} type="button" onClick={handleGoBack}>Go back</button>

            <div className={styles.filmContainer}>
                <img src={handledData.posterURL} alt={handledData.title} />
                <div>
                    <Heading title={handledData.title} />
                    <p className={styles.score}>
                        <span className={styles.scoreHeading}>User Score:</span>
                        {handledData.userScore}
                    </p>

                    <p className={styles.subHeader}>Overview:</p>

                    <p className={styles.overview}>{handledData.overview} </p>

                    <p className={styles.subHeader}>Genres:</p>

                    <ul className={styles.genreContainer}>
                        {handledData.genres.map(genre => (
                            <li className={styles.genre} key={genre.id}>{genre.name}</li>
                        ))}
                    </ul>

                </div>
            </div>

            <div>
                    
                <p className={styles.scoreHeading}>Additional information</p>

                    <ul className={styles.filmAdditionalData}>
                        <li>
                            <NavLink to={{
                                        pathname:`${url.url}/cast`, 
                                        state: {from: location?.state?.from || '/movies'}
                                    }} 
                                    className={styles.link} activeClassName={styles.activeLink}>
                                        Cast
                            </NavLink> 
                        </li>
                        <li>
                            <NavLink to={{pathname:`${url.url}/reviews`,
                                          state: {from: location?.state?.from || '/movies'}
                                    }} className={styles.link} activeClassName={styles.activeLink}>
                                        Reviews
                            </NavLink> 
                        </li>
                    </ul>

                    <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
                        <Route path={`${url.path}/cast`} render={()=> <Cast cast={handledData.cast}/>} />
                        <Route path={`${url.path}/reviews`} render={()=> <Reviews reviews={handledData.reviews}/>} />
                    </Suspense>

            </div>
            
        </div>
    )
}



export default MovieDetailsPage;