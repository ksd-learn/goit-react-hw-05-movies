import { useEffect, useState} from 'react';
import { useSearchParams} from "react-router-dom";
import { SearchMovie } from '../../components/searchMovie/SearchMovie';
import { MoviesList } from '../../components/moviesList/MoviesList';
import { ListNav } from '../../components/listNav/ListNav';
import { QueryApi } from '../../API/QueryApi';
import css from './Movies.module.css'

const Movies = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const queryValue = searchParams.get('query') ?? '';
    const queryPage = Number(searchParams.get('page') ?? 1);

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [showBtnNext, setShowBtnNext] = useState(false);
    const [showBtnPrev, setShowBtnPrev] = useState(false);
    const [error, setError] = useState('null');

    const addQueryValue = (value) => {
        if (value === queryValue) return;
        setSearchParams(
            {
                query: value,
                page: 1
            }
        )
    };

    const handlBtnNext = () => {
        if (queryPage < totalPages) {
            setSearchParams({
                query: queryValue,
                page: (queryPage + 1)
            });
        }
    };

    const handlBtnPrev = () => {
        if (queryPage > 1) {
            setSearchParams({
                query: queryValue,
                page: (queryPage - 1)
            });
        }
    };

    useEffect(() => {
        if (queryValue === '') return;
        setError('null');
        let queryParams = `search/movie?query=${queryValue}&page=${queryPage}`;
        QueryApi(queryParams)
            .then(({ total_pages, results }) => {
                if (!results.length) {
                    setData([]);
                    return Promise.reject(new Error("Поиск завершен, данных нет!"))
                };
                setTotalPages(total_pages)
                setShowBtnNext(queryPage < total_pages );
                setShowBtnPrev(queryPage > 1);
                setData(results);
            })
            .catch(error => setError(error))
    }, [queryPage, queryValue])

    return (
        <>
            <h2 className={css.title}>Movie search</h2>
            <SearchMovie addQueryValue={addQueryValue} />
            {data.length > 0 &&
                <div>
                    <ListNav showBtnPrev={showBtnPrev} showBtnNext={showBtnNext} handlBtnPrev={handlBtnPrev} handlBtnNext={handlBtnNext} />
                    <MoviesList data={data} /> 
                </div>
            }
            {error.message==="Поиск завершен, данных нет!" &&
                <p className={css.listError}>We don't have any movies for this search</p>
            }
        </>
    )
}
export default Movies;