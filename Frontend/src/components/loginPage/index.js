import {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'


const Login = (props)=> {
    const [username , setUserName] = useState("");
    const [errormsg , setErrorMsg] = useState("")
    const [storedToken , setStoredToken] = useState(Cookies.get("cust_id"));

    const history = useNavigate();

    const handleLoadingUsername = (event)=> {
        setUserName(event.target.value);
    }

    const redirectToAnotherRoute = (customer_id )=> {
        console.log("came to redirection");
        Cookies.set("cust_id" , customer_id , {expires : 1});
        setStoredToken(customer_id)
        // history("/");

    }

    useEffect(()=> {
        if(storedToken !== undefined) {
            history("/");
        }
    } , [storedToken])



    const handleLogin = async ()=> {
        const details = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({user : username})
        };
        
        const promiseFetch = await fetch("http://localhost:5000/login" , details);
        console.log(promiseFetch)
        const actualData = await promiseFetch.json();
        if(actualData.ok) {
            // const gotCustomerId = actualData.customer_id;
            redirectToAnotherRoute(actualData.customer_id );
        }
        else {
            setErrorMsg(actualData.msg);
        }
        setUserName("");
    }

    
    return (
            <div>
        <input type = "text" value = {username} onChange = {handleLoadingUsername} />
        <button type = "button" onClick  = {handleLogin}>login</button>
        <p>{errormsg}</p>
    </div>
        )
}

export default Login;