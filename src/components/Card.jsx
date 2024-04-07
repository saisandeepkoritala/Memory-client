import React from 'react';
import "../styles/card.css";

const Card = (data) => {
    const {image,email,message,name,tags,title} = data.data;
    return (
        <div className='card'>
            <div>   
                <img src={image} />
                <p>Title : {title}</p>
                <p>Author : {name}</p>
                <p>Message : {message}</p>
                <p>Tags : {tags}</p>
            </div>
        </div>
    )
}

export default Card