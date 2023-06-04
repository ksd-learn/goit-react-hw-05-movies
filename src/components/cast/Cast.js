import { useState, useEffect } from 'react';
import { QueryApi } from '../../API/QueryApi';
import { useParams } from "react-router-dom";
import css from './Cast.module.css';

export const Cast = () => {

    const { movieId } = useParams();
    
    const [data, setData] = useState([]);
    const [error, setError] = useState('null');

    const defaultImg = 'https://www.baumandblume.com/wp-content/uploads/2017/02/no-image-icon-md.png';

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
            )})}
        </div>
    )
}

export default Cast;