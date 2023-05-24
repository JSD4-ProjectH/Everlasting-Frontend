import React, { useEffect, useState } from 'react'
import Layout from './Navbar/Layout';
import './RegisterForm.css'
import Joi from 'joi';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../config.js';


function RegisterForm() {
  const [registerData, setRegisterData] = useState({firstname:"", lastname:"", email:"", password:"", confirmPassword:""})
  const [nameError, setNameError] = useState("")
  const [lastnameError, setLastNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigation = useNavigate();

  useEffect(()=>{
    // authentication go heres
  },[])

  const handlerChange = ({target})=>{
    const dataName = target.name
    const dataValue = target.value
    setRegisterData(prev => ({...prev, [dataName]:dataValue}))
  }

  const handlerPassword = () =>{
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    setNameError("")
    setLastNameError("")
    setEmailError("")
    setPasswordError("")
    setConfirmPasswordError("")
    const {error, value} = registerSchema.validate(registerData, { abortEarly: false})
    if(error){
      error.details.forEach(err => {
      if(err.path[0]==='firstname'){
        setNameError("firstname must atleast 3 long and contain only letters")
      }
      if(err.path[0]==='lastname'){
        setLastNameError("lastname must atleast 3 long and contain only letters")
      }
      if(err.path[0]==='email'){
        setEmailError("email is contain email format (@gmail.com Etc.)")
      }
      if(err.path[0]==='password'){
        setPasswordError("password is contain atleast 1uppercase, 1lowercase and number")
      }
      if(err.path[0]==='confirmPassword'){
        setConfirmPasswordError("password dose not match")
      }
    })}
  }
  // function for handel validate when regiterData value change
  useEffect(validateForm, [registerData])
  // shcema for validaye with joi
  const registerSchema = Joi.object({
    firstname: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')).min(3).required(),
    lastname: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')).min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp(`^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`)).required(),
    confirmPassword: Joi.ref('password')
  })
        
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const {error, value} = registerSchema.validate(registerData, { abortEarly: false})
    if(error){
      if(nameError||lastnameError||emailError||passwordError||confirmPasswordError){
        alert('cannot send form please fill correct values')
      }else{
        alert("every field cannot be empty")
      }
    }else{
      const resRegisterData = await axios.post(`${BACKEND_URL}/user/register`,{...registerData})
      setRegisterData({firstname:"", lastname:"", email:"", password:"", confirmPassword:""})
      alert(resRegisterData.data.message)
      navigation('/RegisterComplete')
    }
  }

  return (
    <Layout>
      <div className="RegisterForm-page">
        <div className='RegisterForm-box'>
          <h2>Registeration</h2>
          <input 
            type='text' 
            name='firstname' 
            placeholder='firstname' 
            onChange={handlerChange} 
            value={registerData.firstname || ""} 
            style={{backgroundColor:nameError&&registerData.firstname?"salmon":null}}
          />
          <p>{nameError&&registerData.firstname?nameError:""}</p>
          <input 
            type='text' 
            name='lastname' 
            placeholder='lastame' 
            onChange={handlerChange} 
            value={registerData.lastname || ""} 
            style={{backgroundColor:lastnameError&&registerData.lastname?"salmon":null}}
          />
          <p>{lastnameError&&registerData.lastname?lastnameError:""}</p>
          <input 
            type='email' 
            placeholder='email' 
            name='email' 
            onChange={handlerChange} 
            value={registerData.email || ""} 
            style={{backgroundColor:emailError&&registerData.email?"salmon":null}}
          />
          <p>{emailError&&registerData.email?emailError:""}</p>
          <input 
            type={showPassword?'text':'password'} 
            placeholder='password' name='password' 
            onChange={handlerChange} 
            value={registerData.password || ""} 
            style={{backgroundColor:passwordError&&registerData.password?"salmon":null}}
          />
          <p>{passwordError&&registerData.password?passwordError:""}</p>
          <input 
            type={showPassword?'text':'password'} 
            placeholder='confirm password' 
            name='confirmPassword' 
            onChange={handlerChange} 
            value={registerData.confirmPassword || ""} 
            style={{backgroundColor:confirmPasswordError&&registerData.confirmPassword?"salmon":null}}
          />
          <p>{confirmPasswordError&&registerData.confirmPassword?confirmPasswordError:""}</p>
          <button onClick={handlerPassword}>{showPassword?"hide password":"show password"}</button>
          <button onClick={handlerSubmit}>SUBMIT</button>
          <span>Already has a account?  
            <a href='#'> Sign in</a> here!
          </span>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterForm