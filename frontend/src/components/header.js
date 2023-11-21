import React from "react";
import "../components.css/header.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



const Header = () => {
    return (
      <header class='container' id='head'>
        <div id='logomain'>
          <Link to='/'>
            <img id='header-img' src='./icon_main.png' alt='Image' />
          </Link>
        </div>
        <div class="topnav">
          <Link to="/about">Giới thiệu</Link>
          <Link to="/service">Dịch vụ</Link>
          <Link to="/login">Đặt lịch hẹn</Link>
          <Link to="/login">Đăng nhập</Link>
          <Link to="/signup">Đăng ký</Link>
        </div>
      </header>
    );
  };

export default Header;
  