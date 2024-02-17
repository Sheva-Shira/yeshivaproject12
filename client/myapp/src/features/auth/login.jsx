
import { AutoComplete } from 'primereact/autocomplete';
import React, { useState } from "react";


const Login = () => {
    
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const search = (event) => {
        setItems([...Array(10).keys()].map(item => event.query + '-' + item));
    }
    return (
        <>
        
        <span className="p-float-label">
            <AutoComplete inputId="ac" value={value}  suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} />
            <label htmlFor="ac">UserName</label>
        </span></>
    )
}
export default Login
