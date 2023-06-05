import { useState, useEffect, useRef} from 'react';
import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { QueryApi } from '../../API/QueryApi';
import { SlArrowLeft } from "react-icons/sl";
import css from './MovieDetailes.module.css'

const MovieDetailes = () => {
    const { movieId } = useParams();
    const location = useLocation();
                                    /* запись аналогична {location.state && location.state.from || '/movies'} */
    const backLinkLocation = useRef(location.state?.from ?? '/movies')

    const [data, setData] = useState([]);
    const [, setError] = useState('null');

    useEffect(() => {
        if (!movieId) return;
        let queryParams = `movie/${movieId}?language=en-US`;
        QueryApi(queryParams)
            .then((details) => {
                if (!details) return Promise.reject(new Error("Поиск завершен, данных нет!"));
                setData(details)
            })
            .catch(error => setError(error))
    }, [movieId]);

    const { title, release_date, overview, poster_path, genres } = data;

    return (
        <>
            <Link to={backLinkLocation.current} className={css.descriptionLink}><SlArrowLeft/> Back</Link>

            {title &&
                <div className={css.description}>
                    <img className={css.descriptionImg} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
                    <h2>{title} ({release_date})</h2>
                    <div className={css.descriptionOverview}>
                        <h3>Overview</h3>
                        <p>{overview}</p>
                    </div>
                    <div className={css.descriptionGenres}>
                        <h3>Genres</h3>
                        <ul>
                            {genres.length && genres.map(({ id, name }) =>  
                                <li key={id}>{name}</li>
                            )}
                        </ul>
                    </div>
                    <div className={css.descriptionNav}>
                        <h3>Additional information</h3>
                        <NavLink to={'cast'}
                            className={({ isActive }) => (isActive ?
                                `${css.descriptionLink} ${css.descriptionAdditionCast} ${css.active}` :
                                `${css.descriptionLink} ${css.descriptionAdditionCast}`)} >
                            Actors/character
                        </NavLink>
                        <NavLink to={'reviews'}
                            className={({ isActive }) => (isActive ?
                                `${css.descriptionLink} ${css.active}` : css.descriptionLink)} >
                            AReviews
                        </NavLink>
                    </div>
                    <div className={css.descriptionAddition}>
                        <Outlet />
                    </div>
                </div>
            }
        </>
    )
}
export default MovieDetailes;