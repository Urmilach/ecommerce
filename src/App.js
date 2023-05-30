//import logo from './logo.svg';
import './App.css';
import SignUp from './components/signup';
import Login from './components/login';
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  
import Dashboard from './components/dashboard'; 
import Cart from './components/cart';

export const TokenProvider=(props)=>{
  const token =1234;
  return<props.component token={token}/>
}

export const ProtectRouter=(props)=>{
  const token = localStorage.getItem("Ecomm_token");
  if(!!token == false) return <Navigate to ="/login"/>
  return props.component;
}
export const PublicRouter=(props)=>{
  const token = localStorage.getItem("Ecomm_token");
  if(token) return <Navigate to ="/dashboard"/>
  return props.component;
}


// export const ProtectRouter=(props)=>{
//   const cart_id = localStorage.getItem("Ecomm_Cart_Id");
//   if(!!token == false) return <Navigate to ="/dashboard"/>
//   return props.component;
// }

function App() {
  const router = createBrowserRouter([
    {
    path: "/signup",
    element: <PublicRouter component={<SignUp />}/>
     },
    {
    path: "/login",
    element: <PublicRouter component={<Login />}/>
    },
    {
    path: "/",
    element: <PublicRouter component={<SignUp />}/>
    },
    {
    path: "/dashboard",
    element: < ProtectRouter component={<Dashboard />} />,
    },
    {
      path: "/cart",
      element: < ProtectRouter component={<Cart/>} />,
      },
   ]);

  return (
    <>
      <div className='App'>
        <ToastContainer />
      <RouterProvider router={router} />
      </div>
</>
  );
}

export default App;
