import React from 'react';
import "../styles/card.css";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setupdatedLike } from "../store";
import { useState } from 'react';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Card = (data) => {
    const dispatch = useDispatch();
    const { email } = useSelector((store) => store?.user?.userData);
    const { isUser } = useSelector((store) => store?.user);
    const { image, message, name, tags, title, _id, likes, likedBy ,createdAt
    } = data.data;
    const [like, setLike] = useState(likes);
    const [userLiked, setUserLiked] = useState(likedBy.includes(email));

    const handleLike = async (id, email) => {
        if(isUser){
            const resp = await axios.post("https://memory-serverr.onrender.com/api/v1/user/LikeMemory", {
            id, email
        });
        setLike(resp?.data?.data?.likes);
        dispatch(setupdatedLike(resp?.data));
        setUserLiked(!userLiked); 
        if(!userLiked){
            toast.success("Liked Successfully", {
                style: { width: '250px' }
            });
        }
        else{
            toast.success("UnLiked Successfully", {
                style: { width: '250px' }
            });
        }
        }
        else{
            toast.error("Login to access", {
                style: { width: '250px' }
            });
        }
    };

    let time=""

    const givenTimestamp = new Date(createdAt).getTime(); 
    const currentTimestamp = Date.now();
    const timeDifferenceInMilliseconds = currentTimestamp - givenTimestamp;

    const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

    if (timeDifferenceInHours >= 24) {
        const days = Math.floor(timeDifferenceInHours / 24);
        const remainingHours = Math.floor(timeDifferenceInHours % 24);
            time=`${days}d ${remainingHours}h`;
    } else {
        const remainingHours = Math.floor(timeDifferenceInHours % 24);
        if(remainingHours===0){
            time=`less than an hour`
        }
        else{
            time=`${remainingHours} hours ago `
        }
    }
    

    return (
        <div className='card'>
            <div>
                <img src={image} alt="Memory Image" onClick={()=>handleDownload(image)}/>
                <p>{tags}</p>
                <p>{title}</p>
                <p>{message}</p>
                <p>Posted By <strong>{name} {time}</strong></p>
                <div onClick={() => handleLike(_id, email)} className='likes'>
                    {userLiked ? <FcLike size={30} /> : <FcLikePlaceholder size={30} />}{like} Likes
                </div>
            </div>
        </div>
    );
};

export default Card;
