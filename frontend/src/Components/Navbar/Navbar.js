import React, { useState } from 'react'
import "./Navbar.css";
import { IoMdClose } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const hideNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <div>
      <nav className="navbar">
      <div className="container">
        <div className="logo">
          Akshay Gehlot
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <GiHamburgerMenu />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/" 
              onClick={hideNavbar}
              >Home</NavLink>
            </li>
            <li>
              <NavLink to="/login"
               onClick={hideNavbar}
              >Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration" 
              onClick={hideNavbar}
              >Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
