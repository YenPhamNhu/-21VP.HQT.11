import React from 'react';
import { Form, Button,FloatingLabel} from 'react-bootstrap';
import '../screen.css/Signup.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



const Signup = () => {
  return (
    <div className="signup-box">
      <div id="logo"><img src='./logicon.png' alt="Image" /></div>
      <Form>
        <Form.Group className="mb-3" controlId="telephone">
          <Form.Label>Số điện thoại:</Form.Label>
          <Form.Control type="tel" required pattern="[0-9]{10}" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dob">
          <Form.Label>Ngày tháng sinh:</Form.Label>
          <input type="date" name="dob" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Địa chỉ:</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
        <Form.Label>Giới tính</Form.Label>
        <Form.Select aria-label="Giới tính" id='gender'>
          <option value="Nữ">Nữ</option>
          <option value="Nam">Nam</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mật khẩu:</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Xác nhận mật khẩu:</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>
        <div id='alrtk'>Đã có tài khoản?  <Link to='/login' id='uptolog' onClick={() => window.scrollTo(0, 0)}>Đăng nhập</Link></div>
       
        
        <Button type="submit">Đăng Ký</Button>
      </Form>
    </div>
  );
};

export default Signup;
