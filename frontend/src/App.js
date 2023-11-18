import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from './components/About.js';
import Contact from './components/Contact.js';
import './App.css';

const Header = () => {
  return (
    <header class='container' id='head'>
      <div id="logo"><img src='./icon_main.png' alt="Image" /></div>
        <nav href="/about"><Link>Giới thiệu</Link></nav>
        <nav href="/contact"><Link>Dịch vụ</Link></nav>
        <nav href="/about"><Link>Đặt lịch hẹn</Link></nav>
        <nav href="/contact"><Link>Đăng nhập</Link></nav>
        <nav href="/about"><Link>Đăng ký</Link></nav>
    </header>
  );
};

const Aside = () => {
  return (
    <aside class='container'>
      <h3>Sidebar</h3>
    </aside>
  );
};

const Main = () => {
  return (
    <main class='container'>
      <Aside />
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
      </Routes>
      <hr id='hrduoi'></hr>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
