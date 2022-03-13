import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { AdmnData } from "./AdmnData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { FaRegBell } from "react-icons/fa";
// import Toast from 'react-bootstrap/Toast';
import { Button} from 'react-bootstrap';
// import ToastContainer from 'react-bootstrap/ToastContainer';
import moment from "moment";
import LeaveDetail from "../pages/LeaveDetail"
import * as RiIcons from "react-icons/ri";

const Nav = styled.div`

  background: #15171c;
  height: 65px;
  display: flex;
  
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 3rem;
  font-size: 2rem;
  height: 65px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const AdmnNav = () => {
  const [sidebar, setSidebar] = useState(true);
  const [viewDetail, setViewDetail] = useState([]);
  const [data,setData]=useState([]);
  const [showA, setShowA] = useState(false);
  const [count,setCount]=useState(true);
  const toggleShowA = () => {setShowA(!showA)};
  

  const showSidebar = () => setSidebar(!sidebar);
  const getNotification = async () => {
    try {
      const res = await fetch('/notifyLeave', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.status === 200) {
        setData(data);
        console.log("notification data");
        console.log(data);
      } else {
        console.log("don't have any notification");
      }
    } catch (err) {
      console.log(err);
    }
  }

  

  useEffect(() => {
    getNotification();
  },[]);
  
  const handleToggleShowA=()=>{
    setShowA(!showA);
    setCount(false);
  }
  return (
    <>
     <div className="modal fade " id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Employee Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <LeaveDetail objId={viewDetail} />
                        </div>
                       
                    </div>
                </div>
            </div>
            
    
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav >
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <h3
            style={{
              textAlign: "center",
              marginLeft: "700px",
              color: "white"
            }}
          >
            ELMS
          </h3>
          <div style={{ marginLeft: "auto", marginRight: "50px", float: "right" }}>
            <FaRegBell size="30px"  onClick={toggleShowA}>
            </FaRegBell>
            <span class="w3-badge w3-red">{count?data.length:0}</span>
          </div>
         
         
        </Nav>
        <div className="border shadow-lg rounded bg-white" style={{display: showA ? 'block' : 'none',height:"",width:"300px",marginLeft: "auto", marginRight: "20px",marginTop:"0px", float: "right",padding:"10px"}}>
           {count?<strong>Notification</strong>:<center><strong>Don't have any Notification</strong></center>}
           {count?
            data.map((note,index) => (
             
               
             <div key={index} className="border p-4  mt-1 shadow-lg rounded bg-white"  
                   type="submit"  data-bs-toggle="modal" 
                  data-bs-target="#exampleModal2"  
        
                  onClick={()=>setViewDetail(note._id)}
                   style={{height:"80px",width:"280px"}}>
                  

                <strong className="me-auto">{note.firstName}{" "}{note.lastName}{"(EMP00" + note.empId + ")"}</strong>
                <br/>
                <i>Applied for leave <b>at</b> </i>{moment(note.postingDate).format("DD/MM/YYYY")}    
                 
                

             </div>
                 
            ))
            :""
          }
          
           <Button className="mt-3 btn btn-sm btn-dark btn-primary " style={{display: count ? 'block' : 'none',marginLeft:"100px"}} onClick={handleToggleShowA}>Clear all</Button>
          
          
          </div>
         
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <RiIcons.RiAdminFill size="50px" style={{marginTop:"30px",marginLeft:"90px"}}/>
            {<div style={{textAlign:"center",marginTop:"20px",color:"white", textTransform: 'uppercase'}}><strong>{"ADMIN"}</strong></div>}
            {AdmnData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>

      </IconContext.Provider>
    </>
  );
};

export default AdmnNav;