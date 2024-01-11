import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/Store.jsx'

// web page
import About from './pages/web_page/About.jsx'
import BeOurPartner from './pages/web_page/BeOurPartner.jsx'
import Contact from './pages/web_page/Contact.jsx'
import Shop from './pages/web_page/Shop.jsx'
import SingleProduct from './pages/web_page/SingleProduct.jsx'

// user page
import Login from './pages/user_page/Login.jsx'
import Register from './pages/user_page/Register.jsx'
import Profile from './pages/user_page/Profile.jsx'
import Cart from './pages/user_page/Cart.jsx'
import Notification from './pages/user_page/Notification.jsx'

// check role route
import PrivateRoute, { AdminRoute, DeliveryManRoute, SuperAdminRoute } from './components/PrivateRoute.jsx'

// private route
import AdminDashboard from './pages/admin_page/AdminDashboard.jsx'
import DeliveryManDashboard  from './pages/deliveryMan_page/DeliveryManDashbaord.jsx'
import SuperAdminDashboard from './pages/superAdmin_page/SuperAdminDashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      {/* web_page */}
      <Route index={true} path="/" element={<Shop />} />
      <Route path="/about_us" element={<About />} />
      <Route path="/be_our_partner" element={<BeOurPartner />} />
      <Route path="/contact_us" element={<Contact />} />
      <Route path="/:id" element={<SingleProduct />} />
      {/* user_page */}
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/profile/cart" element={<Cart />} />
      <Route path='/notification' element={<Notification />} ></Route>
      {/* check role */}
      <Route path="" element={<PrivateRoute />}>
        {/* role: customer */}
        <Route path="/user/profile" element={<Profile />} />
        {/* role: admin */}
        <Route path="" element={<AdminRoute />}>  
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Route>
        {/* role: delivery man */}
        <Route path="" element={<DeliveryManRoute />}>
          <Route path="/deliveryman/dashboard" element={<DeliveryManDashboard/>} />
        </Route>
        {/* role: super admin */}
        <Route path='' element={<SuperAdminRoute />}>
          <Route path="/superadmin/dashboard" element={<SuperAdminDashboard/>} />
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
