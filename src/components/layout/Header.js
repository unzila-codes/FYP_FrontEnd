import React, { useState } from "react";
import "./component.css";
import { Link} from "react-router-dom";
import logo from "../../images/main_logo.png";
import profile_nav from "../../images/profile_nav.jpg";


const Header = () => {
  
  
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = true;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  

  return (
    <>
      <div>
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-md-7">
                <div className="navigation">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/About">About Us</Link>
                    </li>
                    <li>
                      <Link to="/FindHouse">Find House</Link>
                    </li>
                    <li>
                      <Link to="/Contact">Contact</Link>
                    </li>
                    {/* <li>
                    <Link to="/profile">Profile</Link>
                    </li>
                 
                      <li>
                        <Link to="/AddPropertyBasic">Add Property</Link>
                      </li> */}

                      {isLoggedIn && (
                        <>
                          <li>
                            <Link to="/AddPropertyBasic">Add Property</Link>
                          </li>
                          <li>
                            <Link to="/profile">Profile</Link>
                          </li>
                        </>
                      )}
                   
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="icons">
                  <a href="#" onClick={toggleDropdown}>
                    <img
                      className="profile_icon"
                      src={profile_nav}
                      alt="Profile"
                    />
                  </a>
                  {isDropdownOpen && (
                    <div className="dropdown">
                 
                        
                          <Link to="/Profile">Profile</Link> 
                          <Link to="/Logout">Logout</Link> 
                          {/* <a href="#">
                            Logout
                          </a> */}
                        
                          <Link to="/Login">Login</Link>
                          <Link to="/Register">Register</Link>
                      
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
