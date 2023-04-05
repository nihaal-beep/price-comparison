import './App.css';
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth'
import LoginPage from './components/LoginPage';
import MainPage from "./components/MainPage";
import { useState } from 'react';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "shopping-3f25f.firebaseapp.com",
  projectId: "shopping-3f25f",
  storageBucket: "shopping-3f25f.appspot.com",
  messagingSenderId: "875392086199",
  appId: "1:875392086199:web:0a5c3b55264d40cde8dd32",
  measurementId: "G-DLMHQ08HGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const api = {
  key:process.env.REACT_APP_API_KEY,
  base: "https://price-api.datayuge.com/api/v1/compare/"
}

function App() {
  console.log()
  const [user] = useAuthState(auth);
  const [searchData,setSearchData] = useState();
  const [productId,setProductId] = useState();
  const[productData,setProductData] = useState();
  // useEffect(
  // async function getProduct()
  // {
  //   const response = await fetch(`${api.base}product=Apple iPhone 6 Plus 16GB&api_key=${api.key}`);
  //   const data = await response.json()
  //   console.log(data)
  // }
  // getProduct();
  
  // ,[]);
  async function getProduct(prod)
  {
    const response_prodId = await fetch(`${api.base}search?api_key=${api.key}&product=${prod}`);
    //const prodId = response_prodId.json().data.0.
    const data = await response_prodId.json()
    console.log(data.data.slice(0,5))
    setSearchData(data.data.slice(0,6));
    
  }
  async function getID(prod)
  {
    const response_prodId = await fetch(`${api.base}detail?api_key=${api.key}&id=${prod}`);
    //const prodId = response_prodId.json().data.0.
    const data = await response_prodId.json()
    console.log(data.data.stores)
    setProductData(data.data.stores);
    
  }
  
  return (
    <div className="App">
      
      {user? <MainPage auth={auth} getProduct ={getProduct} pdata={setProductData} sdata={setSearchData}/>  : <LoginPage auth = {auth} />}
      {searchData? <div> 
        {searchData.map((item)=>(
          <div key = {item.id} onClick={()=>{
            setSearchData(false);
            getID(item.product_id);
          }} className='search-item'>
            <h3>{item.product_title}</h3>
            <img src={item.product_image} />

            </div>
        ))}
        
      </div>:<p></p>}
      {productData && <div className='prod-list' > 
        {productData.map((item)=>{
          const storeName = Object.keys(item)[0];
          
          console.log(item[storeName])
          if(!Array.isArray(item[storeName]))
          return(
            <div key = {item.id}  className='prod-item'>
            <h2>{item[storeName].product_store}</h2>
            
            <a href={item[storeName].product_store_url}>{item[storeName].product_store_url}</a>
            <h2 class='price'>{item[storeName].product_price}</h2>
            </div> )
            
          /*<div key = {item.id} /*onClick={()=>{
            setSearchData(false);
            getID(item.product_id);
          }}*/ /*class='prod-item'>
            <h2>{item[storeName].product_store}</h2>
            
            <a href={item[storeName].product_store_url}>{item[storeName].product_store_url}</a>
            <h2 class='price'>{item[storeName].product_price}</h2>
            </div>*/
        })}
        
      </div>}
      </div>
  );
}

export default App;
