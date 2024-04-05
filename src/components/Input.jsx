import React from 'react';
import "../styles/input.css";

const Input = ({onChange,label,value,className}) => {
    return (
        <input type="text" onChange={onChange} placeholder={label} value={value} className={className}/>
    )
}

export default Input