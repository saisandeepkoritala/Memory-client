import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setCurrentPage,setTotalPages,setMemories} from "../store";
import "../styles/pagination.css";
import axios from "axios";
import { MdKeyboardDoubleArrowLeft,MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = () => {

    const dispatch = useDispatch();
    const {TotalPages,CurrentPage} = useSelector((store)=>store.user)
    // console.log("totalpages",TotalPages,"currentpage",CurrentPage)
    const handleSubmit =async(page)=>{
        // console.log(page)
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 0);
        dispatch(setCurrentPage(page))
        const resp = await axios.post("https://memory-serverr.onrender.com/api/v1/user/Page",{
            page:page
        })
            // console.log(resp.data)
            dispatch(setMemories(resp?.data?.items))
            dispatch(setCurrentPage(resp?.data?.currentPage))
            dispatch(setTotalPages(resp?.data?.totalPages))
    }
    let render =[];
    for(let i=1;i<=TotalPages;i++){
        render.push(
            <div
            key={i}
            onClick={() => handleSubmit(i)}
            className={CurrentPage === i ? "red" : "blue"}
        >
            <h2>{i}</h2>
        </div>
        
        )
    }

    const handleRight = () => {
        if (CurrentPage < TotalPages) { 
            handleSubmit(CurrentPage+1)
        }
    };

    const handleLeft = () => {
        if (CurrentPage > 1) { 
            handleSubmit(CurrentPage-1)
        }
    };
    return (
        <div className='pagination'>
            <MdKeyboardDoubleArrowLeft size={30} 
                onClick={handleLeft}/>
            {render}
            <MdKeyboardDoubleArrowRight size={30}
                onClick={handleRight}/>
        </div>
    )
}

export default Pagination;