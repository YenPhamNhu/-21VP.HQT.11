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
import MainPatient from './screens/Patient/Main_patient.js';
import DetailPatient from './screens/Patient/Detail_patient.js';
import SetdatePatient from './screens/Patient/Setdate_patient.js';
import DentistPatient from './screens/Patient/Dentist_patient.js';
import ProfilePatient from './screens/Patient/Profile_patient.js';
import PaymentPatient from './screens/Patient/Payment_patient.js';
import MainDentist from './screens/Dentist/Main_dentist.js';
import DetailDentist from './screens/Dentist/Detail_dentist.js';
import SearchDentist from './screens/Dentist/Dentist_search.js';
import ListDate from './screens/Dentist/ListDate_dentist.js';
import ListMed from './screens/Dentist/ListMed_dentist.js';
import Schedule from './screens/Dentist/Schedule_dentist.js';
import UpdatePatient from './screens/Dentist/UpdateProfile_patient.js';
import MainEmployee from './screens/employee/Main_employee.js';
import CreateProfile from './screens/employee/CreateProfile_employee.js';
import DetailEmployee from './screens/employee/Detail_employee.js';
import ListMedEmployee from './screens/employee/ListMed_employee.js';
import PaymentEmployee from './screens/employee/Payment_employee.js';
import SearchEmployee from './screens/employee/Search_employee.js';
import SearchProfileEmployee from './screens/employee/SearchProfile_employee.js';
import SetdateEmployee from './screens/employee/Setdate_employee.js';
import UpdatePatientEmployee from './screens/employee/UpdatePatient_employee.js';
import MainAdmin from './screens/admin/Main_admin.js';
import DetailAdmin from './screens/admin/Detail_admin.js';
import AccountManage from './screens/admin/AccountManagement.js';
import Dashboard from './screens/admin/Dashboard.js';
import InfoAppo from './screens/admin/InfoAppointement.js';
import StoreMed from './screens/admin/StoreMed.js';



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
        <Route path="/dentist" element={<MainDentist />} />
        <Route path="/dentist/detail" element={<DetailDentist />} />
        <Route path="/dentist/search" element={<SearchDentist />} />
        <Route path="/dentist/listdate" element={<ListDate />} />
        <Route path="/dentist/listmed" element={<ListMed />} />
        <Route path="/dentist/schedule" element={<Schedule />}/>
        <Route path="/dentist/updatepatient" element={<UpdatePatient />} />
        <Route path="/employee" element={<MainEmployee />} />
        <Route path="/employee/create" element={<CreateProfile />} />
        <Route path="/employee/detail" element={<DetailEmployee />} />
        <Route path="/employee/listmed" element={<ListMedEmployee />} />
        <Route path="/employee/payment" element={<PaymentEmployee />} />
        <Route path="/employee/search" element={<SearchEmployee />}/>
        <Route path="/employee/searchprofile" element={<SearchProfileEmployee />} />
        <Route path="/employee/setdate" element={<SetdateEmployee />} />
        <Route path="/employee/updatepatient" element={<UpdatePatientEmployee />} />
        <Route path="/admin" element={<MainAdmin />} />
        <Route path="/admin/detail" element={<DetailAdmin />}/>
        <Route path="/admin/account" element={<AccountManage />}/>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/infoappo" element={<InfoAppo />} />
        <Route path="/admin/storemed" element={<StoreMed />} />
      </Routes>
      <hr id="hrduoi"></hr>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
