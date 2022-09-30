import React, { useState } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../Firebase';
import {Link} from "react-router-dom";


const Navbar = ({ name,setsigninn,setQuery}) => {
  const [expression, setExpression] = useState("");
  // sign out function 
  const logout=async()=> {
    signOut(auth).then(() => {            
    setsigninn(false);
  }).catch((error) => {});
    
}
  return (
    <div>
      {/* navbar using bootstrap  */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a href="#" className="navbar-brand" >IMDB</a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link> 
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/watchlist">Watchlist</Link> 
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={logout}>Signout</a>
              </li>

              <li className="nav-item">
                <a className="btn btn-outline-success" >Signed in as {name}</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setExpression(e.target.value); }}></input>
              <Link  to="/Search">
              <button onClick={(e) => {setQuery(expression) }} className="btn btn-outline-success" type="submit">Search</button>
              </Link> 
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar