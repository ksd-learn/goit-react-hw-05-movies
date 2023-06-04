import { useState, useEffect } from 'react';
import { QueryApi } from '../../API/QueryApi';
import { useParams } from "react-router-dom";
import css from './Reviews.module.css';

export const Reviews = () => {

    const { movieId } = useParams();
    
    const [data, setData] = useState([]);
    const [pageQuery, setPageQuery] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showPaginationForward, setShowPaginationForward] = useState(false);
    const [error, setError] = useState('null');

    const handlBtnRight = () => {
        if (totalPages > pageQuery) {
            setPageQuery((prevState) => prevState + 1);
        }
    };

    useEffect(() => {
        if (!movieId) return;
        let queryParams = `movie/${movieId}/reviews?language=en-US&page=${pageQuery}`;
        QueryApi(queryParams)
            .then(({ total_pages, results }) => {
                if (!total_pages) return Promise.reject(new Error("Поиск завершен, данных нет!"));
                setData((prevstate) => [...prevstate, ...results])
                setTotalPages(total_pages);
                setShowPaginationForward(total_pages > pageQuery);
            })
            .catch(error => setError(error))
    }, [pageQuery, movieId]);

    return (
        <>
            {data.length > 0 &&
                <div className={css.reviews}>
                    {data.map(({ id, author, content }) => {
                        return (
                            <div className={css.reviewsTxt} key={id}>
                                <h3>{author}</h3>
                                <p>{content}</p>
                            </div>
                    )})}

                    {showPaginationForward &&
                        <button type='button' onClick={handlBtnRight}>Right</button>
                    }
                
                </div>
            }
            
            {!data.length &&
                <p>We don't have any reviews for this movie</p>
            }
        </>
    )
}

export default Reviews;