import React,{useState} from 'react';
import "../styles/create.css";
import Input from "./Input";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import {setMemories} from "../store";
import { useRef } from 'react';

const Create = () => {
    const dispatch = useDispatch();
    const[Title,SetTitle] = useState("");
    const[Message,SetMessage] = useState("");
    const[Tags,SetTags]=useState("");
    const[file,Setfile]=useState("");
    const fileInputRef = useRef(null); // Create a ref for the file input element

    const isUser = useSelector((store)=>store.user.isUser);
    const {displayName,email} = useSelector((store)=>store?.user?.userData)

    const handleChangeTitle = (e)=>{
        SetTitle(e.target.value)
    }
    const handleChangeMessage = (e)=>{
        SetMessage(e.target.value)
    }
    const handleChangeTags = (e)=>{
        SetTags(e.target.value)
    }

    const handleSubmit =async(e)=>{
        if(isUser){
        console.log(Title,Message,Tags,file)
        const formdata = new FormData();
        formdata.append("title",Title);
        formdata.append("message",Message);
        formdata.append("tags",Tags);
        formdata.append('file', file);
        formdata.append("name",displayName);
        formdata.append("email",email);

        const resp = await axios.post("http://localhost:5000/api/v1/user/create",formdata)
            if(resp.status===200){
                console.log("just created",resp.data.data)
                dispatch(setMemories([resp?.data?.data]))
                SetMessage("");
                SetTags("");
                SetTitle("");
                Setfile(null);
                fileInputRef.current.value = ''
            }
        }
        else{
            console.log("Login bro")
            alert("login bro")
        }
    }
    return (
        <div className='create'>
            <p>Creating a Memory</p>
            <Input onChange={handleChangeTitle} value={Title} label="Title"/>
            <textarea
                    value={Message}
                    onChange={handleChangeMessage}
                    rows={4}
                    cols={50}
                    placeholder='Message'
                    className='message'
                    />
            <Input onChange={handleChangeTags} value={Tags} label="Tags"/>
                <input type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e)=>Setfile(e.target.files[0])}
                />
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button>Clear</button>
        </div>
    )
}

export default Create