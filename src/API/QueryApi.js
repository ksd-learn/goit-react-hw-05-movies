import PropTypes from 'prop-types';

export const QueryApi = (queryParams) => {
                                                // сервис фильмов Movie Database
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2Y3YjIzNThkYWU0ZGNhYmQ5MGVhNDRiY2ZhNDNjYyIsInN1YiI6IjY0MzQ0YzFhMjJhZjNlMDA3NzUzNGU3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yLpZHH8ipOiaOW3q2xZDYpV6-InwHEYxZkC_XfF4S4c'
        }
    };
    const url = `https://api.themoviedb.org/3/${queryParams}`

    return (
        fetch(url, options)
            .then(response => {
                if (response) {
                    return response.json();
                } else {
                    return Promise.reject(new Error("Данных нет!"))
                }
                })
            .catch(error => console.log(error))
    )
}

QueryApi.propTypes = {
    queryParams: PropTypes.string,
};