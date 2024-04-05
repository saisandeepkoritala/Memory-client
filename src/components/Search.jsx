import React, { useState } from 'react';
import "../styles/search.css";
import Input from "./Input";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTag, setSearchTag] = useState("");

    const handleChangeTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleChangeTag = (e) => {
        setSearchTag(e.target.value)
    }

    const handleSubmit = (e) => {
        console.log(searchTerm, searchTag)
    }

    return (
        <div className='search'>
            <Input onChange={handleChangeTerm} value={searchTerm} label="Search Memory"/>
            <Input onChange={handleChangeTag} value={searchTag} label="Search Tags"/>
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default Search;
