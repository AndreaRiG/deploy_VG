import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGameByname } from '../../redux/actions';
import style from './SearchBar.module.css'
const SearchBar = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getGameByname(name));
        setName("");
    }

    return (
        <div>


            <form onSubmit={(e) => handleSubmit(e)}>
                <input className={style.search}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit" className={style.botonsearch}>Search</button>
            </form>

        </div>
    )
}

export default SearchBar;