import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchMovie.module.css'

export const SearchMovie = ({addQueryValue}) => {
    
    const [value, setValue] = useState('');
    
    const handleChange = event => {
        setValue(event.target.value)
    };

    const handlSubmit = (event) => {
        event.preventDefault();
        if (value) {
            addQueryValue(value);
            setValue('')
        }
    };
    
    return (
        <>
        <form onSubmit={handlSubmit}>
            <input className={css.search}
              type="text"
              value={value}
              onChange={handleChange}
              //autoComplete="off"
              autoFocus
              placeholder="movie title"
              required/>
            <button  type="submit">
                <span><AiOutlineSearch /></span>
            </button>
        </form>
        </>
    )    
}

SearchMovie.propTypes = {
    addQueryValue: PropTypes.func.isRequired,
};