import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './componants/HomePage.jsx';
import LoginForm from './componants/LoginForm.jsx';
import { Provider, useSelector } from 'react-redux';
import store from "./app/store.js"
import Settings from './componants/Settings.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      
      
      {
        path: "/homepage",
        element:<HomePage/> 
      },
      {
        path: "/login",
        element:<LoginForm/> 
      },
      {
        path: "/settings",
        element:<Settings/> 
      },
    
     
    
      
    ],
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store} >

     <RouterProvider router={router} />
     <ToastContainer/>
     </Provider>
  </StrictMode>,
)
