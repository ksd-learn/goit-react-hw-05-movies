import { Route, Routes } from "react-router-dom";
import { Layout } from './Layout';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MovieDetailes from 'pages/MovieDetailes';


export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='movies' element={<Movies />} />
          <Route path='movies/:moviesId' element={<MovieDetailes />}>
            <Route path='cast' element={<div>Cоmp cast </div>} />
            <Route path='cast' element={<div>Cоmp reviews </div>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
