import { Route, Routes } from "react-router-dom";
import { Layout } from './Layout';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MovieDetailes from 'pages/MovieDetailes';
import Cast from './cast/Cast';
import Reviews from './reviews/Reviews';


export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='movies' element={<Movies />} />
          <Route path='movies/:movieId' element={<MovieDetailes />}>
            <Route path='cast' element={<Cast />} />
            <Route path='reviews' element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
