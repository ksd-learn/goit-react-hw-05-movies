import { useState} from 'react';
import { useSearchParams} from "react-router-dom";
import { SearchMovie } from '../components/searchMovie/SearchMovie';
import { MoviesList } from '../components/moviesList/MoviesList';
import css from './Movies.module.css'

const Movies = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';

    const [queryValue, setqueryValue] = useState(query);

    const APIreference = 'search/movie';

    const addQueryValue = (value) => {
        if (value === queryValue) return;
        setSearchParams(
            {
                language: 'en-US',
                query: value,
                page: 1
            }
        )
        setqueryValue(value);
    };

    const btnPage = (queryPage) => {
        setSearchParams({
            language: 'en-US',
            query: queryValue,
            page: queryPage
        });
    };

    return (
        <>
            <h2 className={css.title}>Movie search</h2>
            <SearchMovie addQueryValue={addQueryValue} />
            <MoviesList btnPage={btnPage} APIreference={APIreference} />
        </>
    )
}
export default Movies;