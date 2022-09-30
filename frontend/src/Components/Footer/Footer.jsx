import React from 'react';

import './footer.css';
import {Link} from "react-router-dom";

const Footer = () => (
  <div className=" footer-main">
    <div className=" footer-links">

      <div className=" footer-links_logo">
       <h2 >IMDB </h2>
        <p> Home of Movies. </p>
      </div>

      <div className=" footer-links_div">
        <h4>Links</h4>
       <Link to="/">Home</Link> 
       <Link to="/watchlist">Watchlist</Link> 
      </div>

      <div className=" footer-links_div">
        <h4>Social Media</h4>
        <a href="https://facebook.com" target="_blank">Facebook</a>
        <a href="https://instagram.com" target="_blank">Instagram</a>
      </div>

      <div className=" footer-links_div">
        <h4>Get in touch</h4>
        <p>info@imdb.com</p>
      </div>
    </div>
{/* copyright  */}
    <div className=" footer-copyright">
      <p>Copyright © 2022. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
