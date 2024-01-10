import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="bg-purple-50 w-full h-full">
        <div className="max-w-screen-2xl mx-auto w-full ">
          <Navbar/>
          <Outlet />

          <ToastContainer/>
        </div>
      </div>
    </>
  )
}

export default App
