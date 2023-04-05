import {Fragment, useState} from "react"
import { signInWithPopup,GoogleAuthProvider,signOut,signInWithEmailAndPassword } from "firebase/auth";
import ErrorModal from "./ErrorModal";
import Register from "./Register";
import "./loginPage.css";


function LoginPage(props)
{
    const googleProvider = new GoogleAuthProvider();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isError,setIsError] = useState()
    const [regClicked,setRegClicked] = useState(false);

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
        await signInWithEmailAndPassword(props.auth,email,password)}
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
            else if (err.code === "auth/user-not-found")
                {
                    setIsError({
                        title:"User Not Found",
                        message:"Register if you are a new user"
                    })
                } 
            else if(err.code === "auth/weak-password")
            {
                setIsError({
                    title:"Weak password",
                    message:"Password should at least 6 characters long"
                })
            }
            else if (err.code === "auth/wrong-password")
            {
                setIsError({
                    title:"Wrong Password",
                    message:"Enter the correct password"
                })
            }
        }
        
        setEmail("")
        setPassword("")
    }

    async function googleSignInHandler()
    {
        try{
            await(signInWithPopup(props.auth,googleProvider))
        }
        catch(err){
            console.log(err)
        }
    }

    function registeredHandler()
    {
        setRegClicked(false);
    }
    
    return(
        <Fragment>
        <h1 align="center">Price Comparison</h1>
        {regClicked? <Register onRegisterd = {registeredHandler} onOkay={onOkayHandler} auth={props.auth}/> : 
        <div>
        {warning}
        <form onSubmit={onSubmitHandler} className="f">
        <label>Email</label>

        <input value={email} placeholder="xyz@xyz.com" onChange={(event) => {
          setEmail(event.target.value);  
        }} />

        <label>Password</label>

        <input value={password} type="password" placeholder="******" onChange={(event) => {
          setPassword(event.target.value);  
        }} />

        <button type="submit" className="reg" >Submit</button>
        </form>
        <button className= "sign-in" onClick={googleSignInHandler} ><img src={require("../assets/682665_favicon_google_logo_new_icon.png")} width="24px" height="24px" alt="google-img"/> Sign in with google </button> 
    
        <p>New user?</p>
        <button className="reg" onClick={()=>{
            setRegClicked(true)
        }}>Register</button>
    </div>}
        
        </Fragment>
    )

}

export default LoginPage;