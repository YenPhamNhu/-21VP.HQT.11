import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from './components/About.js';
import Contact from './components/Contact.js';
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import './App.css';

const Header = () => {
  return (
    <header class='container' id='head'>
      <div id="logo"><a href="/"><img src='./icon_main.png' alt="Image" /></a></div>
        <Link to="/about" class="nav-link"><a class='link-a'>Giới thiệu</a></Link>
        <Link to="/contact" class="nav-link"><a class='link-a'>Dịch vụ</a></Link>
        <Link to="/login" class="nav-link"><a class='link-a'>Đặt lịch hẹn</a></Link>
        <Link to="/login" class="nav-link"><a class='link-a'>Đăng nhập</a></Link>
        <Link to="/signup" class="nav-link"><a class='link-a'>Đăng ký</a></Link>
    </header>
  );
};


const Main = () => {
  return (
    <main class='container' id='main'>
      <div>
        <h2>Main</h2>
      </div>
    </main>
  );
};

const Footer = () => {
  return (
    <footer class='container' id='foot'>
      <h4>footer</h4>
    </footer>
  );
};

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <hr id='hrtren'></hr>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <hr id='hrduoi'></hr>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
