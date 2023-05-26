import { Link } from "react-router-dom";

export const MoviesList = (query) => {
    return (
        <div>
            {['dog-1', 'dog-2', 'dog-3'].map((item) => {
                return (
                    <Link key={item} to={`/Movies/${item}`}>
                        {item}
                    </Link>
                )
            })}
        </div>
    )
}