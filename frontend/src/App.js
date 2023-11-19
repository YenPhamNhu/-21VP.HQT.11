import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import "./App.css";
import { FaAngleRight } from "react-icons/fa6";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail, MdInfo } from "react-icons/md";

const Header = () => {
  return (
    <header class='container' id='head'>
      <div id='logo'>
        <img src='./icon_main.png' alt='Image' />
      </div>
      <nav href='/about'>
        <Link>Giới thiệu</Link>
      </nav>
      <nav href='/contact'>
        <Link>Dịch vụ</Link>
      </nav>
      <nav href='/about'>
        <Link>Đặt lịch hẹn</Link>
      </nav>
      <nav href='/contact'>
        <Link>Đăng nhập</Link>
      </nav>
      <nav href='/about'>
        <Link>Đăng ký</Link>
      </nav>
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
    <footer className='container' id='foot'>
      <div className='footer-section'>
        <h4 className='text-uppercase fw-bold mb-4 d-flex align-items-center'>
          <img
            src='/icon_main.png'
            alt=' '
            className='me-3 center'
            textAlign='center'
          />
        </h4>
        <p style={{ textAlign: "justify", paddingLeft: "10%" }}>
          Chigsa, đội ngũ chuyên gia nha khoa tận tâm với trang thiết bị hiện
          đại, cam kết mang lại trải nghiệm chăm sóc nha khoa chất lượng cao.
          Chúng tôi không chỉ điều trị vấn đề nha khoa mà còn tạo nên nụ cười
          khỏe mạnh và tự tin. Hãy đồng hành cùng chúng tôi trên hành trình duy
          trì và nâng cao sức khỏe răng của bạn!
        </p>
      </div>
      <div className='footer-section'>
        <h4 className='text-uppercase fw-bold p' style={{ paddingLeft: "15%" }}>
          NỔI BẬT
        </h4>
        <p>
          <Link to='#' className='link'>
            Niềng răng thẩm mỹ
          </Link>
        </p>
        <p>
          <Link to='#' className='link'>
            Cấy ghép Implant
          </Link>
        </p>
        <p>
          <Link to='#' className='link'>
            Bọc răng sứ
          </Link>
        </p>
        <p>
          <Link to='#' className='link'>
            Mặt dán sứ Veneer
          </Link>
        </p>
        <p>
          <Link to='#' className='link'>
            Điều trị tuỷ
          </Link>
        </p>
      </div>
      <div className='footer-section'>
        <h4 className='text-uppercase fw-bold'>GIỜ MỞ CỬA</h4>
        <div className='mb-2'>
          <FaAngleRight />
          Thứ hai <span> 9.00 AM - 19.00 PM</span>
        </div>
        <div className='mb-2'>
          <FaAngleRight />
          Thứ ba <span> 9.00 AM - 19.00 PM</span>
        </div>
        <div className='mb-2'>
          <FaAngleRight />
          Thứ tư <span> 9.00 AM - 19.00 PM</span>
        </div>
        <div className='mb-2'>
          <FaAngleRight />
          Thứ năm <span> 9.00 AM - 19.00 PM</span>
        </div>
        <div className='mb-2'>
          <FaAngleRight />
          Thứ sáu <span> 9.00 AM - 19.00 PM</span>
        </div>
      </div>
      <div className='footer-section'>
        <h4 className='text-uppercase fw-bold mb-4'>LIÊN HỆ</h4>
        <p>
          <Link to='#' className='link' style={{ paddingLeft: "0px" }}>
            <MdInfo /> About us
          </Link>
        </p>
        <p>
          <FaMapMarkerAlt /> Nguyễn Văn Cừ, quận 5, Thành phố Hồ Chí Minh
        </p>
        <p>
          <MdEmail /> info@nhakhoachigsa.com
        </p>
        <p>
          <FaPhoneAlt /> 1900 8686
        </p>
        <div className='d-flex p-2 mb-4 cus-icon'>
          <Link to='#'>
            <FaFacebook />
          </Link>
          <Link to='#'>
            <FaInstagram />
          </Link>
          <Link to='#'>
            <FaTwitter />
          </Link>
        </div>
      </div>
    </footer>
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
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <hr id='hrduoi'></hr>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
