import {useSelector,useDispatch} from "react-redux";
import {setisUser} from "../store";
import "../styles/account.css";


const Account = () => {

    const dispatch = useDispatch();
    const {picture,displayName} = useSelector((store)=>store.user.userData)
    

    const handleLogout=()=>{
        dispatch(setisUser(false))
    }
    return (
        <div className="account">
            <div className="account_img">
                <img src={picture} alt="" />
            </div>
            <div className="account_name">
                <p>{displayName}</p>
            </div>
            <div className="logout">
                <button onClick={handleLogout}>LogOut</button>
            </div>
        </div>
    )
}

export default Account