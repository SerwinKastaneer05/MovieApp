import './App.css';
import { Home } from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from './Components/Login/LoginPage';
import axios from 'axios';
import Watchlist from './Components/Watchlist/Watchlist';
import { Search } from './Components/Search/Search';

// for showing toast notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer/Footer';

function App() {
  const [DataList, setDataList] = useState([]);
  const [name, setname] = useState("");
  const [signinn, setsigninn] = useState(false);
  const [apikey, setapikey] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [added, setadded] = useState("");

  //getting api key from backend
  useEffect(() => {
    axios.get('http://localhost:3001/readapi').then((response) => {
      setapikey(response.data);
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
      {/* Showing pages on conditional basis  */}
        {signinn ?
          <>
            <Navbar name={name} setsigninn={setsigninn} setQuery={setQuery} />
            <div className="app-components">
            <Routes>
              <Route path="/" element={<Home DataList={DataList} setDataList={setDataList} apikey={apikey} email={email} setadded={setadded} />} />
              <Route path="/watchlist" element={<Watchlist apikey={apikey} email={email} />} />
              <Route path="/Search" element={<Search apikey={apikey} email={email} added={added} query={query} />} />
            </Routes>
            </div>
            <Footer/>
          </>
          :
          <LoginPage name={name} setname={setname} setsigninn={setsigninn} setEmail={setEmail} />}

      </BrowserRouter>
      {/* toast notification configs  */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
