import { useState, useEffect} from 'react';
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { QueryApi } from '../../API/QueryApi';
import PropTypes from 'prop-types';
import css from './moviesList.module.css'

export const MoviesList = ({ APIreference, btnPage}) => {
    
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const queryValue = searchParams.get('query') ?? '';
    const queryPage = Number(searchParams.get('page') ?? 1);
    const apiSearch = location.search;

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [showBtnNext, setShowBtnNext] = useState(false);
    const [showBtnPrev, setShowBtnPrev] = useState(false);
    const [error, setError] = useState('null');

    const handlBtnNext = () => {
        if (queryPage < totalPages) {
            btnPage(queryPage + 1)
        }
    };

    const handlBtnPrev = () => {
        if (queryPage > 1) {
            btnPage(queryPage - 1)
        }
    };

    useEffect(() => {
        if (APIreference !== 'trending/movie/day' && queryValue === '') return;
        setError('null');
        let queryParams = `${APIreference}${apiSearch}`;
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
    }, [queryValue, queryPage, APIreference, apiSearch]);

    return (
        <>
            {data.length > 0 &&
                <div className={css.list}>
                    <div className={css.listNav}>
                        <div className={css.listNavLeft}>
                            { showBtnPrev &&
                                <button type='button' onClick={handlBtnPrev}>Prev</button>
                            }
                            { !showBtnPrev&&showBtnNext &&
                                <button className={css.listNavLeftOff} type='button'>Prev</button>
                            }
                        </div>
                        <div>
                            { showBtnNext &&
                                <button type='button' onClick={handlBtnNext}>Next</button>
                            }
                            { !showBtnNext&&showBtnPrev &&
                                <button className={css.listNavLeftOff} type='button'>Next</button>
                            }
                        </div>
                    </div>
                    {data.map(({ id, title }) => {
                        return (
                            <Link className={css.listLink} key={id} to={`/movies/${id}`} state={{from: location}}>
                                {title}
                            </Link>
                        )
                    })}
                </div>
            }
            {error.message==="Поиск завершен, данных нет!" &&
                <p className={css.listError}>We don't have any movies for this search</p>
            }
        </>
    )
}

MoviesList.propTypes = {
    btnPage: PropTypes.func.isRequired,
    APIreference: PropTypes.string,
};