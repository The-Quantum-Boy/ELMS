import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Loading } from '../components/Loading';

export const AdmnLogout = () => {
  const navigate = useNavigate();
  const [loader,setLoader]=useState(false);

  //using promises
  useEffect(() => {
      fetch('/adminlogout',{
          method: "GET", 
          headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
          }    
       }).then((res)=>{
        //   navigate("/AdminLogin",{replace:true});
          if(res.status === 200) {
             setLoader(true)
             console.log("admin logged out");
          }
       }).catch((err) =>{
              console.log(err);
       })
  });
  return (<div>
      {loader?navigate("/AdminLogin",{replace:true}):<Loading />}
  </div>)
}

export default AdmnLogout;

