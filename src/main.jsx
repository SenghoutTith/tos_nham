import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/Store.jsx'

import About from './pages/About.jsx'
import BeOurPartner from './pages/BeOurPartner.jsx'
import Contact from './pages/Contact.jsx'
import Shop from './pages/Shop.jsx'
import Login from './pages/auth/Login.jsx'
import Register from "./pages/auth/Register.jsx"
import Profile from "./pages/auth/user_page/Profile.jsx"
import Cart from "./pages/auth/user_page/Cart.jsx"
import Notification from './pages/auth/user_page/Notification.jsx'

import PrivateRoute, { AdminRoute, DeliveryManRoute } from "./components/PrivateRoute.jsx"
import AdminDashboard from './pages/auth/admin_page/AdminDashboard.jsx'
import DeliveryManDashboard from './pages/auth/deliveryMan_page/DeliveryManDashbaord.jsx'
import SingleProduct from './pages/SingleProduct.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path="/" element={<Shop />} />
      <Route path="/about_us" element={<About />} />
      <Route path="/be_our_partner" element={<BeOurPartner />} />
      <Route path="/contact_us" element={<Contact />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/profile/cart" element={<Cart />} />
      <Route path='/notification' element={<Notification />} ></Route>
      <Route path="/:id" element={<SingleProduct />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="" element={<AdminRoute />}>  
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Route>
        <Route path="" element={<DeliveryManRoute />}>
          <Route path="/deliveryman/dashboard" element={<DeliveryManDashboard/>} />
        </Route>
      </Route>
    </Route>
  ) 
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider >
  </Provider>
)
