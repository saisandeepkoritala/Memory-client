import React from 'react'
import "../styles/cards.css";
import Card from './Card';
import { useEffect,useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setMemories } from '../store';


const Cards = () => {
    const dispatch= useDispatch();
    useEffect(()=>{
        const getData=async()=>{
            const resp = await axios.get("http://localhost:5000/api/v1/user/getMemories")
            console.log(resp.data.Memory)
            dispatch(setMemories(resp.data.Memory))
        }
        getData();
    },[])
    
    const Memories = useSelector((store)=>store.user.Memories);
    const uniqueArray = Array.from(new Set(Memories));

    const render = uniqueArray.map((item)=><Card key={item._id} data={item}/>)

    return <div className='cards'>
        {render}
    </div>
}

export default Cards