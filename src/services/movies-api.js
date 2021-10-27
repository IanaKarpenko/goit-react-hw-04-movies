const URL = 'https://api.themoviedb.org/3/';
const KEY = '5682043567c0669eee2ae44b7b28882e';

export const fetchMovies = async () => {
    const fullUrl =  `${URL}trending/movie/day?api_key=${KEY}`;
    const response = await fetch(fullUrl);
    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = ({movieId, language = 'en-US'}) => {
    const fullUrl = `${URL}movie/${movieId}?api_key=${KEY}&language=${language}&append_to_response=credits,reviews,backdrop_path`;
    return fetch(fullUrl)
        .then(response => response.json())
        .then(data => data);
}

export const fetchMovieBySearch = ({query, language = 'en-US'}) => {
    const fullUrl = `${URL}search/movie?api_key=${KEY}&language=${language}&query=${query}&page=1`;
    return fetch(fullUrl)
        .then(response => response.json())
        .then(data => data.results);
}
