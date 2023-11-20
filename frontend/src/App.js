import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import About from "./screens/About.js";
import Service from "./screens/Service.js";
import Login from "./screens/Login.js";
import Signup from "./screens/Signup.js";
import Footer from "./components/footer.js";
import Main from "./components/main.js";
import Header from "./components/header.js";

const Cpyright = () => {
  return (
    <div
      classname='text-center p-3'
      style={{
        backgroundColor: "#04364a",
        textAlign: "center",
        color: "white",
        textDecoration: "none",
      }}
    >
      &copy;2023
      <Link classname='link' id='chigsa' href='#'>
        Chigsa.com
      </Link>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <hr id='hrtren'></hr>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <hr id='hrduoi'></hr>
      <Footer />
      <Cpyright />
    </BrowserRouter>
  );
};

export default App;
