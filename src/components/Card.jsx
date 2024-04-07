import React from 'react';
import "../styles/card.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setupdatedLike } from "../store";
import { useState } from 'react';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";


const Card = (data) => {
    const dispatch = useDispatch();
    const { email } = useSelector((store) => store?.user?.userData);
    const { image, message, name, tags, title, _id, likes, likedBy } = data.data;
    const [like, setLike] = useState(likes);
    const [userLiked, setUserLiked] = useState(likedBy.includes(email));

    const handleLike = async (id, email) => {
        const resp = await axios.post("https://memory-serverr.onrender.com/api/v1/user/LikeMemory", {
            id, email
        });
        setLike(resp?.data?.data?.likes);
        dispatch(setupdatedLike(resp?.data));
        setUserLiked(!userLiked);
    };

    return (
        <div className='card'>
            <div>
                <img src={image} alt="Memory Image" />
                <p>{tags}</p>
                <p>{title}</p>
                <p>{message}</p>
                <p>Posted By <strong>{name}</strong></p>
                <div onClick={() => handleLike(_id, email)} className='likes'>
                    {userLiked ? <FcLike size={30} /> : <FcLikePlaceholder size={30} />}{like} Likes
                </div>
            </div>
        </div>
    );
};

export default Card;
