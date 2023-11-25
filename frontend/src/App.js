import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./screens/About.js";
import Service from "./screens/Service.js";
import Login from "./screens/Login.js";
import Signup from "./screens/Signup.js";
import Footer from "./components/footer.js";
import Main from "./components/main.js";
import Header from "./components/header.js";
import Forgetpass from "./screens/Forgetpass.js"
import ServiceDetails from "./screens/Service_detail.js"
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
        <Route path='/forgetpass' element={<Forgetpass/>}/>
        <Route path='/service/:number' element={<ServiceDetails/>}/>
      </Routes>
      <hr id='hrduoi'></hr>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
