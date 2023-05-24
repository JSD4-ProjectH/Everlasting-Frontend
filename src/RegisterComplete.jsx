import React from "react";
import Navbar from './Navbar/Navbar';
import "./RegisterComplete.css";

const logo = "/images/logotrans.png";
const RegisterComplete = () => {
  return (
    <>
    <Navbar/>
    <div className="body">
      <div className="container">
        <img src={logo} alt="logo" />
        <h1>Registration Completed</h1>
        <h4>Thank you for signing up with us!</h4>
        <a href="/Login">
          <span>Sign in here!</span>
        </a>
      </div>
    </div>
    </>
  );
};
export default RegisterComplete;