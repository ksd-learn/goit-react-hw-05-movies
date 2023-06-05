import { useSearchParams } from "react-router-dom";
import { MoviesList } from '../../components/moviesList/MoviesList';
//import css from './Home.module.css'

const Home = () => {

    //const [searchParams, setSearchParams] = useSearchParams();
    const [, setSearchParams] = useSearchParams();

    const APIreference = 'trending/movie/day';
    
    const btnPage = (queryPage) => {
        setSearchParams({
            page: queryPage
        });
    };

    return (
        <>
            <h2>Trending today</h2>
            <MoviesList btnPage={btnPage} APIreference={APIreference} />
        </>
    )
}

export default Home;