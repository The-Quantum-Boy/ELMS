import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { EmpData } from "./EmpData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { FaUserCircle} from "react-icons/fa";

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
  
const EmpNav = ({empData}) => {
  console.log(empData);
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  // empData.filter(employee=>employee.empId ====)
  // const [value,setValue]=useState(true);
  
  
  return (
    <>
      
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <center>
          <h3
            style={{  textAlign: "center",
                     marginLeft: "700px",                     
                     color: "white" }}
          >
            ELMS 
          </h3></center>
        </Nav>
        <SidebarNav sidebar={sidebar}>
        
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <FaUserCircle size="50px" style={{marginTop:"30px",marginLeft:"90px"}}/>
            {<div style={{textAlign:"center",marginTop:"20px",color:"white", textTransform: 'uppercase'}}><strong>{
              //  value?
               empData.map((emp,index)=>{
                  if(index ===0){
                    return (emp.firstName+" "+emp.lastName+"("+emp.empId+")");
                  }
                  return("");
                })
             
                
              }</strong></div>
              }
              <div style={{marginTop:"50px"}}>
            {EmpData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            </div>
          </SidebarWrap>
         
        </SidebarNav>
        
      </IconContext.Provider>
    </>
  );
};
  
export default EmpNav;