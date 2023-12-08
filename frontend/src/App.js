import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './screens/About.js';
import Service from './screens/Service.js';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import Footer from './components/footer.js';
import Main from './components/main.js';
import Header from './components/header.js';
import Forgetpass from './screens/Forgetpass.js';
import ServiceDetails from './screens/Service_detail.js';
import Resetpass from './screens/Resetpass.js';
import MainPatient from './screens/main_patient.js';
import DetailPatient from './screens/Detail_patient.js';
import SetdatePatient from './screens/Setdate_patient.js';
import DentistPatient from './screens/Dentist_patient.js';
import ProfilePatient from './screens/Profile_patient.js';
import PaymentPatient from './screens/Payment_patient.js';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpass" element={<Forgetpass />} />
        <Route path="/resetpass" element={<Resetpass />} />
        <Route path="/service/:number" element={<ServiceDetails />} />
        <Route path="/patient" element={<MainPatient />} />
        <Route path="/patient/detail" element={<DetailPatient />} />
        <Route path="/patient/setdate" element={<SetdatePatient />} />
        <Route path="/patient/dentist" element={<DentistPatient />} />
        <Route path="/patient/profile" element={<ProfilePatient />} />
        <Route path="/patient/payment" element={<PaymentPatient />} />
      </Routes>
      <hr id="hrduoi"></hr>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
