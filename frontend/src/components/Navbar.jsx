import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="logo">
          <svg width="150" height="50" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <style>
              {`
                .icon { fill: #003366; }
                .text { font-family: Arial, sans-serif; font-size: 24px; fill: #003366; }
              `}
            </style>
            <circle className="icon" cx="20" cy="30" r="15" />
            <rect className="icon" x="40" y="20" width="20" height="20" />
            <text x="70" y="35" className="text">JobVista</text>
          </svg>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(!show)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/jobs"} onClick={() => setShow(!show)}>
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to={"/dashboard"} onClick={() => setShow(!show)}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} onClick={() => setShow(!show)}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </nav>
    </>
  );
};

export default Navbar;
