
import { AutoComplete } from 'primereact/autocomplete';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
const Login = () => {
    
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const  a=5;
    const search = (event) => {
        setItems([...Array(10).keys()].map(item => event.query + '-' + item));
    }
    return (
        <>
        
        <div className="card flex justify-content-center">
            <span className="p-float-label">
                <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                <label htmlFor="username">Username</label>
            </span>
        </div></>
    )
}
export default Login

