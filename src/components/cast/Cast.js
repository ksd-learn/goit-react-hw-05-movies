import { useState, useEffect } from 'react';
import { QueryApi } from '../../API/QueryApi';
import { useParams } from "react-router-dom";
import css from './Cast.module.css';

export const Cast = () => {

    const { movieId } = useParams();
    
    const [data, setData] = useState([]);
    const [, setError] = useState('null');
    //const [error, setError] = useState('null');

    const defaultImg = 'data:image/jpeg;base64,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';

    useEffect(() => {
        if (!movieId) return;
        let queryParams = `movie/${movieId}/credits?language=en-US`;
        QueryApi(queryParams)
            .then(({ cast }) => {
                if (!cast.length) return Promise.reject(new Error("Поиск завершен, данных нет!"));
                setData(cast)
            })
            .catch(error => setError(error))
    }, [movieId]);
    
    return (
        <div className={css.cast}>
            {data.map(({ id, character, name, profile_path }) => {return (
                <div className={css.castItem} key={id}>
                    <div className={css.castItemPhoto}>
                        <img src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}`: defaultImg} alt={name}/>
                    </div>
                    <h4>{name}</h4>
                    <p>Character: {character}</p>
                </div>
            )
            })}
            {!data.length &&
                <p>We don't have any photo for this movie</p>
            }
        </div>
    )
}

export default Cast;