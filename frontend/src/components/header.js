import React from "react";
import "../components.css/header.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const links = document.querySelectorAll('.topnav a');

for (let link of links) {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default action of the link
    const href = event.target.getAttribute('href'); // Get the href attribute of the link
    updatePageContent(href); // Update the page content based on the href
  });
}

function updatePageContent(href) {
  // Use Ajax or fetch API to load the content of the page and update the DOM
  // Here's an example using fetch API:
  fetch(href)
    .then(response => response.text())
    .then(data => {
      // Update the DOM with the new content
      document.getElementById('main').innerHTML = data;
    });
}

const Header = () => {
    return (
      <header class='container' id='head'>
        <div id='logomain'>
          <a href='/'>
            <img id='header-img' src='./icon_main.png' alt='Image' />
          </a>
        </div>
        <div class="topnav">
          <a href="/about">Giới thiệu</a>
          <a href="/service">Dịch vụ</a>
          <a href="/login">Đặt lịch hẹn</a>
          <a href="/login">Đăng nhập</a>
          <a href="/login">Đăng ký</a>
        </div>
      </header>
    );
  };

export default Header;
  