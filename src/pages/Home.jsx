import Header from "../components/Header";
import Account from "../components/Account";
import Cards from "../components/Cards";
import Search from "../components/Search";
import Create from "../components/Create";
import "../styles/home.css";
import {useSelector,useDispatch} from "react-redux";
import { SignIn } from "../components/SignIn";
import { useLocation ,useNavigate} from 'react-router-dom';
import queryString from 'query-string';
import { useState,useEffect } from "react";
import {setisUser,setuserData} from "../store"


const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const isUser = useSelector((store)=>store.user.isUser);

    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        if (queryParams.userData) {
            const decodedUserData = JSON.parse(decodeURIComponent(queryParams.userData));
            setUserData(decodedUserData);
            dispatch(setuserData(decodedUserData))
            console.log(decodedUserData);
            if(decodedUserData){
                dispatch(setisUser(true))
                navigate("/");
            }
        }
    }, [dispatch,navigate,location.search]);

    return (    
        <div className="main">
            <div className="home">
                <Header />
                {isUser?<Account />:<SignIn />}
            </div>
            <div className="home_hero">
                <Cards />
                <div className="filters">
                    <Search />
                    <Create />
                </div>
            </div>
        </div>
    )
}

export default Home