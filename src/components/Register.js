import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import ErrorModal from "./ErrorModal";

function Register(props)
{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isError,setIsError] = useState()
    let warning; 
    if(isError)
    {
        warning= <ErrorModal msg={isError.message} title={isError.title} onOkay={onOkayHandler} />
    }
    function onOkayHandler()
    {
        setIsError(false)
    }
    async function onSubmitHandler(event)
    {
        if(password.trim().length===0)
        {
            setIsError({
                title:"Invalid password",
                message:"The password cannot be empty"
            })
        }
        event.preventDefault();
        try{
        await createUserWithEmailAndPassword(props.auth,email,password)}
        catch(err)
        {
            console.log(err)
            if(err.code === "auth/invalid-email")
            {
                if(email.trim().length===0)
                {setIsError({
                    title:"Invalid Email",
                    message:"The email cannot be empty"
                });}
                else
                {
                    setIsError({
                        title:"Invalid Email",
                        message:"Enter a valid email"
                    });
                }
            } 
            else if(err.code === "auth/weak-password")
            {
                setIsError({
                    title:"Weak password",
                    message:"Password should at least 6 characters long"
                })
            }
        }
        setEmail("")
        setPassword("")
    }


    return(
        
        <div>

        {warning}

        <h2 align="center" >Enter Credentials</h2>
        <form className="f" onSubmit={onSubmitHandler}>
        <label>Email</label>

        <input value={email} placeholder="xyz@xyz.com" onChange={(event) => {
          setEmail(event.target.value);  
        }} />

        <label>Password</label>

        <input value={password} type="password" placeholder="******" onChange={(event) => {
          setPassword(event.target.value);  
        }} />

        <button type="submit">Submit</button>
        </form>
        <button onClick = {props.onRegisterd}>Done</button>
        </div>
    )
}

export default Register;