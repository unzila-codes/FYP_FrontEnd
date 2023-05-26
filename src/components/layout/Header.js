import React, { useState, useContext } from "react";
import "./component.css";
import { Link} from "react-router-dom";
import logo from "../../images/main_logo.png";
import profile_nav from "../../images/profile_nav.jpg";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  
  const { isLoggedIn, logout} = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  
  const handleLogout = () => {
    logout();
  };

  // UserContext say call krega
  // const handleLogout = () => {
  //   logout(); 
  // };

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
                      <Link to="/Register">JoinUs</Link>
                    </li> */}
                    {isLoggedIn && (
                      <li>
                        <Link to="/AddPropertyBasic">Add Property</Link>
                      </li>
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
                      {isLoggedIn ? (
                        <>
                        {isLoggedIn && (
                          <Link to="/profile">Profile</Link>
                        )}
                          {/* <Link to="/Logout">Logout</Link> */}
                          <a href="#" onClick={handleLogout}>
                            Logout
                          </a>
                        </>
                      ) : (
                        <>
                          <Link to="/Login">Login</Link>
                          <Link to="/Register">Register</Link>
                        </>
                      )}
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
