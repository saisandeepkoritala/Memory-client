import React, { useState } from 'react';
import "../styles/search.css";
import Input from "./Input";
import axios from "axios";
import {setMemories} from "../store";
import {useDispatch} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTag, setSearchTag] = useState("");

    const dispatch = useDispatch();

    const handleChangeTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleChangeTag = (e) => {
        setSearchTag(e.target.value)
    }

    const handleSubmit = async(e) => {
        console.log(searchTerm, searchTag)
        const resp = await axios.post("https://memory-serverr.onrender.com/api/v1/user/search",{
            searchTerm,searchTag
        })
        console.log(resp)
        if(resp?.data?.data?.length){
            dispatch(setMemories(resp?.data?.data))
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 0);
            toast.success("Fetched successfully", {
                style: { width: '250px' }
            });
        }
        else{
            toast.error("Sorry can't find", {
                style: { width: '250px' }
            });
        }
    }

    return (
        <div className='search'>
            <p>Search a Memory</p>
            <Input onChange={handleChangeTerm} value={searchTerm} label="Search By Title ......"/>
            <Input onChange={handleChangeTag} value={searchTag} label="Search By Tags ......"/>
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default Search;
