import { BiAlarm } from "react-icons/bi";
import "../styles/header.css";
const Header = () => {
    return (
        <div className="header">
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