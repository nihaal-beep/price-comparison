import {signOut} from "firebase/auth";
import {useEffect, useState} from "react";
import "./mainPage.css";

function MainPage(props)
{
    const[prod,setProd] = useState();
    
    async function logOut()
    {
        await signOut(props.auth);
    }
    function onSubmitHandler(e)
    {
        e.preventDefault();
        props.getProduct(prod)
        setProd("");
    }
    return(
    <div>
        <header>
        <img className="mainlogo" src={require("../assets/comparison.png")} width="60px" height="60px"  alt="c"></img>
        <h1 className="heading">Price Comparison</h1>
        <form onSubmit={onSubmitHandler}> 
            <input className="search" value={prod} onClick={()=>{
                props.pdata()}} onChange= {(e)=>{
                setProd(e.target.value);
            }}>
            </input>
        </form>
         <div   className="a"  >
        <button className="log-out" onClick={logOut}>log out</button>
        <button className="cart"> <img src= {require("../assets/icons8-shopping-cart-48.png")} alt="cart" height="24px" width="24px"></img></button>
        </div>
        
        </header>
        
    </div>)


}

export default MainPage;