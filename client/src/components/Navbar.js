import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Data } from "./Data";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
  
const Nav = styled.div`
  background: #15171c;
  height: 65px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const NavIcon = styled(Link)`
  margin-left: 2rem;
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
  
const Navbar = () => {
  const [sidebar, setSidebar] = useState(true);
  
  const showSidebar = () => setSidebar(!sidebar);
  
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
                       marginLeft: "600px",                   
                     color: "white" }}
          >
            Employee Leave Management System
          </h3>
          </center>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <div style={{marginTop:"50px"}}>
            {Data.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            </div>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};
export default Navbar;
