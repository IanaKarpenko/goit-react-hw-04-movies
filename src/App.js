import styles from './App.module.scss';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import NotFoundPage from './pages/NotFoundPage';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);

const MoviesPage = lazy(() =>
  import('./pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        
      <AppBar/>

      </header>

      <Switch>

        <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies" exact component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
        </Suspense>
          <Route component={NotFoundPage} />
      </Switch>
      
    </div>
  );
}

export default App;
