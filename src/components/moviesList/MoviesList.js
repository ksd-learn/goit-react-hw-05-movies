import { Link, useLocation } from "react-router-dom";
//import PropTypes from 'prop-types';
import css from './moviesList.module.css'

export const MoviesList = ({data}) => {
    
    const location = useLocation();

    return (
        <div className={css.list}>
            {data.map(({ id, title }) => {
                return (
                    <Link className={css.listLink} key={id} to={`/movies/${id}`} state={{from: location}}>
                        {title}
                    </Link>
                )
            })}
        </div>

    )
}

//MoviesList.propTypes = {
//    btnPage: PropTypes.func.isRequired,
//    APIreference: PropTypes.string,
//};