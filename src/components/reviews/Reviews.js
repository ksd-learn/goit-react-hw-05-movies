import { useState, useEffect } from 'react';
import { QueryApi } from '../../API/QueryApi';
import { useParams } from "react-router-dom";
import css from './Reviews.module.css';

export const Reviews = () => {

    const { movieId } = useParams();
    
    const [data, setData] = useState([]);
    const [, setError] = useState('null');


    useEffect(() => {
        if (!movieId) return;
        let queryParams = `movie/${movieId}/reviews?language=en-US`;
        QueryApi(queryParams)
            .then(({ total_pages, results }) => {
                if (!total_pages) return Promise.reject(new Error("Поиск завершен, данных нет!"));
                setData(results)
            })
            .catch(error => setError(error))
    }, [movieId]);

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
                        )
                    })}
                </div>
            }
            {!data.length &&
                <p>We don't have any reviews for this movie</p>
            }
        </>
    )
}

export default Reviews;