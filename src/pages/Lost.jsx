import React from 'react';
import "../styles/lost.css";
import { useNavigate } from 'react-router-dom';


const Lost = () => {
    const navigate = useNavigate();
    return (
        <div className='lost'>
            <div className='image'>
            </div>
            <div className='data'>
                <p>Looks like you are lost</p>
                <button onClick={()=>navigate("/")}>Back to home</button>
            </div>
        </div>
    )
}

export default Lost