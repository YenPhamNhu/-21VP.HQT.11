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

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <hr id='hrduoi'></hr>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
