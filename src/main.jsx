import React, { children } from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Error from './Error'
import AddActivity from './AddActivity';
import EditActivity from './EditActivity';
import EditProfile from './EditProfile';
import RegisterComplete from './RegisterComplete';
import RegisterForm from './RegisterForm';
import Layout from './Navbar/Layout';
import Dashboard from './DashBoard';
import Login from './Login';
import LandingPage from './LandingPage';

const ProtectRoute = ({children}) => {
  const token = localStorage.getItem('token')
    if(token){
      return children
    }else{
      return <Navigate to='/Login' />
    }
  }

const router = createBrowserRouter([
  {
    path: "/",
    element:  <LandingPage />,  //Should be landing page
    errorElement: <Error />,
  },
  {
    path: "/Login",
    element:  <Login />,
    errorElement: <Error />,
  },
  {
    path: "/AddActivity/:quickData",
    element:  (
      <ProtectRoute>
        <AddActivity />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/RegisterComplete",
    element: <RegisterComplete />,
    errorElement: <Error />,
  },
  {
    path: "/RegisterForm",
    element:  <RegisterForm />,
    errorElement: <Error />,
  },
  {
    path: "/EditActivity/:id",
    element:  (
      <ProtectRoute>
        <EditActivity />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/EditProfile/:id",
    element:  (
      <ProtectRoute>
        <EditProfile />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: "/Dashboard",
    element:  (
      <ProtectRoute>
        <Dashboard />
      </ProtectRoute>
    ),
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)