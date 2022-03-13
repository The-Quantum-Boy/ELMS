import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Loading } from '../components/Loading';
export const EmpLogout = () => {
  const navigate = useNavigate();
  const [loader,setLoader]=useState(false);
  //using promises
  useEffect(() => {
      fetch('/emplogout',{
          method: "GET", 
          headers:{
              Accept: "application/json",
              "Content-Type": "application/json"
          }    
       }).then((res)=>{
        //   navigate("/EmployeeLogin",{replace:true});
          if(res.status === 200) {
              setLoader(true);
              console.log("employee logged out");
          }
       }).catch((err) =>{
              console.log(err);
       })
  });
  return (<div>
            {loader?navigate("/EmployeeLogin",{replace:true}):<Loading/>}
          </div>)
}

export default EmpLogout;

