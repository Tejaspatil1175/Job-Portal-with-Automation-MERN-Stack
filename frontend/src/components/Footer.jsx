import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <footer className="footer">
        <div className="footer-logo">
          <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
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
        <div className="footer-support">
          <h4>Support</h4>
          <ul>
            <li>At post June Bhampur Tal Shirpur Dis Dhule</li>
            <li>Email: tejaspatil1175@gmail.com</li>
            <li>Phone: +91 8788244416</li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="footer-follow">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="https://x.com/Tejasspatill?s=09" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="footer-icon" />
                <span>Twitter (X)</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/tejaspatil_010?igsh=OWMzNGNoeWw5NWV3" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="footer-icon" />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="footer-icon" />
                <span>YouTube</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="footer-icon" />
                <span>LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="footer-copyright">
        &copy; 2024 Tejas. All Rights Reserved.
      </div>
    </>
  );
};

export default Footer;
