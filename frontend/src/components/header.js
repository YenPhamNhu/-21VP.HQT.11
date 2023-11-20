import React from "react";
import "../components.css/header.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Header = () => {
    return (
      <header class='container' id='head'>
        <div id='logo'>
          <a href='/'>
            <img id='header-img' src='./icon_main.png' alt='Image' />
          </a>
        </div>
        <Link to='/about' class='nav-link'>
          <a class='link-a'>Giới thiệu</a>
        </Link>
        <Link to='/service' class='nav-link'>
          <a class='link-a'>Dịch vụ</a>
        </Link>
        <Link to='/login' class='nav-link'>
          <a class='link-a'>Đặt lịch hẹn</a>
        </Link>
        <Link to='/login' class='nav-link'>
          <a class='link-a'>Đăng nhập</a>
        </Link>
        <Link to='/signup' class='nav-link'>
          <a class='link-a'>Đăng ký</a>
        </Link>
      </header>
    );
  };

export default Header;
  