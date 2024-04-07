import React from 'react'
import "../styles/cards.css";
import Card from './Card';
import { useEffect} from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setMemories, setTotalPages } from '../store';
import Pagination from './Pagination';
import Blank from './Blank';


const Cards = () => {
    const dispatch= useDispatch();
    useEffect(()=>{
        const getData=async()=>{
            const resp = await axios.post("https://memory-serverr.onrender.com/api/v1/user/Page")
            dispatch(setMemories(resp?.data?.items))
            dispatch(setCurrentPage(resp?.data?.currentPage))
            dispatch(setTotalPages(resp?.data?.totalPages))
        }
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const Memories = useSelector((store)=>store.user.Memories);
    const uniqueArray = Array.from(new Set(Memories));

    const render = uniqueArray.map((item)=><Card key={item._id} data={item}/>)

    return <div className='cards'>
        <div className='cards-inner'>
            {uniqueArray.length ? render : <Blank times={4} />}
        </div>
        <Pagination />
    </div>
}

export default Cards;