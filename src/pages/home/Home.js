import { useSearchParams } from "react-router-dom";
import { MoviesList } from '../../components/moviesList/MoviesList';
import { ListNav } from '../../components/listNav/ListNav';
import { useEffect, useState } from "react";
import { QueryApi } from '../../API/QueryApi';
import css from './Home.module.css'

const Home = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const queryPage = Number(searchParams.get('page') ?? 1);

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [showBtnNext, setShowBtnNext] = useState(false);
    const [showBtnPrev, setShowBtnPrev] = useState(false);
    const [error, setError] = useState('null');
    

    const handlBtnNext = () => {
        if (queryPage < totalPages) {
            setSearchParams({
                page: (queryPage + 1)
            });
        }
    };

    const handlBtnPrev = () => {
        if (queryPage > 1) {
            setSearchParams({
                page: (queryPage - 1)
            });
        }
    };

    useEffect(() => {
        setError('null');
        let queryParams = `trending/movie/day?page=${queryPage}`;
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
    }, [queryPage])
    return (
        <>
            <h2 className={css.title}>Trending today</h2>
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

export default Home;