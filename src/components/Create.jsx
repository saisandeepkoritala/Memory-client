import React,{useState} from 'react';
import "../styles/create.css";
import Input from "./Input";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import {setMemories} from "../store";
import { useRef,useEffect } from 'react';
import { storage } from "./Firebase";

const Create = () => {
    const dispatch = useDispatch();
    const[Title,SetTitle] = useState("");
    const[Message,SetMessage] = useState("");
    const[Tags,SetTags]=useState("");
    const[file,Setfile]=useState(null);
    const[image,Setimage]=useState("");
    const fileRef = useRef(null);
    const[pic,Setpic]=useState("");
    const[progress,Setprogress]=useState(0);

    useEffect(()=>{
        const getURL = async () => {
            if (file) {
                const imageRef = storage.ref(`/images/${file.name}`);
        
                // Attach observer to monitor upload progress
                const uploadTask = imageRef.put(file);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes)*100);


                        Setprogress(progress);
                        console.log('Upload is ' + progress + '% done');
                        // Update progress state if needed
                        // For example, you can use SetProgress(progress);
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error("Error uploading image:", error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            Setpic(downloadURL);
                        });
                    }
                );
            }
        }
        
        getURL();
    },[file])


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

    const handleSubmit = async () => {
        if (isUser) {
                    const formData = {
                        title: Title,
                        message: Message,
                        tags: Tags,
                        file: pic,
                        name: displayName,
                        email: email
                    };
    
                    const requestOptions = {
                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
    
                    const response = await fetch('http://localhost:5000/api/v1/user/create', requestOptions);
                    const data = await response.json();
    
                    if (response.status === 200) {
                        console.log("just created", data.data);
                        dispatch(setMemories([data?.data]));
                        SetMessage("");
                        SetTags("");
                        SetTitle("");
                        Setfile(null);
                        Setpic("");
                        fileRef.current.value = '';
                    }
                    else{
                        console.log("error broo")
                    }
                }
                
    }
        const handleClear=()=>{
                        SetMessage("");
                        SetTags("");
                        SetTitle("");
                        Setfile(null);
                        Setpic("");
                        fileRef.current.value = '';
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
                <input type="file" ref={fileRef} hidden accept="image/*"  onChange={(e)=>Setfile(e.target.files[0])}/>
                <img type="file"
                src={pic || "https://img.freepik.com/premium-vector/3d-upload-button-icon-uploading-icon-up-arrow-bottom-side-symbol-click-here-button-ui-ux_659151-2302.jpg"}
                onClick={()=>fileRef.current.click()}
                />
                {!(progress === 0 || progress ===100) && 
                    <progress value={progress} max="100"><h1>{`${progress}%`}</h1></progress>
                }
                {!(progress===0 || progress ===100) && <h2>{progress}</h2>}

            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
}

export default Create