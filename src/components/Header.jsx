import { BiAlarm } from "react-icons/bi";
import "../styles/header.css";
import {setCurrentPage,setMemories,setTotalPages} from "../store";
import {useDispatch} from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const dispatch = useDispatch();
    const handleSubmit =async()=>{
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 0);
        dispatch(setCurrentPage(1))
        const resp = await axios.post("https://memory-serverr.onrender.com/api/v1/user/Page",{
            page:1
        })
            dispatch(setMemories(resp?.data?.items))
            dispatch(setCurrentPage(resp?.data?.currentPage))
            dispatch(setTotalPages(resp?.data?.totalPages))
            toast.success("Navigating to latest Memories", {
                style: { width: '250px' }
            });
    }
    return (
        <div className="header" onClick={()=>handleSubmit()}>
            <ToastContainer />
            <div className="header_name">
                <p>Memories</p>
            </div>
            <div className="header_icon">
                <BiAlarm />
            </div>
        </div>
    )
}

export default Header