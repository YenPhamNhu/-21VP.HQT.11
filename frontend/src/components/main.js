import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/banner';
import "../screen.css/Main.css";

const Main = () => {
  return (
    <main className='container-img' id='main'>
      <div className='buttons-container'>
        <Link to='/' className='btn btn-primary'>
          Home Page
        </Link>
        <Link to='/login' className='btn btn-primary'>
        Đăng Nhập
        </Link>
        <Link to='/signup' className='btn btn-secondary'>
        Đăng Ký
        </Link>
      </div>

      <div className='welcome-section'>
        <h2>Welcome to Chigsa!</h2>
        <p>Explore our services and enjoy a seamless experience.</p>
      </div>

      <Banner />
    </main>
  );
};

export default Main;
