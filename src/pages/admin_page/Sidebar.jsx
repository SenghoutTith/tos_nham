import { FaRegUser } from "react-icons/fa"; 
import { FaUsers } from "react-icons/fa"; 
import { GiRoundStar } from "react-icons/gi"; 
import { RiUserStarLine } from "react-icons/ri"; 
import { FaCashRegister } from "react-icons/fa"; 
import React from 'react'
import { useGetAllPaymentsQuery, useGetAllUsersQuery, useGetProfileQuery, useLogoutMutation } from '../../redux/features/userApiSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/UserSlice";

const Sidebar = ( {onNavItemClick } ) => {

    const [ logoutApiCall, {isLoading} ] = useLogoutMutation()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const logoutHandler = async () => {
      try {
          await logoutApiCall().unwrap()
          dispatch(logout())
          toast.success('Logout Successfull')
          navigate("/")
      } catch (error) {
          toast.error(error?.data?.message || error?.message);
      }
    }

  const { data, isLoading: userLoading } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true })

  const { data: paymentData, isLoading: paymentLoading } = useGetAllPaymentsQuery({}, { refetchOnMountOrArgChange: true })

  const { data: userData, isLoading: userDataLoading } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true })

  const filterCustomer = userData?.filter(user => user.role === 'customer')

  const filterMerchant = userData?.filter(user => user.role === 'admin')

  const filterDeliveryMan = userData?.filter(user => user.role === 'deliveryman')
 
  return (
    <>
      { isLoading || userLoading || paymentLoading || userDataLoading && <Loader /> }
        <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="sidebar-multi-level-sidebar" className="fixed pt-[5rem] top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">

              { data?.role === 'admin' && <li onClick={() => onNavItemClick("dashboard")}>
                  <a href='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                    </svg>
                    <span className="ms-3">Dashboard</span>
                  </a>
              </li>}

              { data?.role === 'superadmin' && <li onClick={() => onNavItemClick("superdashboard")}>
                  <a href='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                    </svg>
                    <span className="ms-3">Super Dashboard</span>
                  </a>
              </li>}

              { data?.role === 'admin' && <li onClick={() => onNavItemClick("inbox")}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{data?.orders.length}</span>
                  </a>
              </li>}

              { data?.role === 'admin' && <li onClick={() => onNavItemClick("products")}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                  </a>
              </li>}

              { data?.role === 'superadmin' && <li onClick={() => onNavItemClick("payment")}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <FaCashRegister />
                    <span className="flex-1 ms-3 whitespace-nowrap">All Payments</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{paymentData?.length}</span>
                  </a>
              </li>}

              { data?.role === 'superadmin' && <li onClick={() => onNavItemClick("all-users")}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <FaUsers />
                    <span className="flex-1 ms-3 whitespace-nowrap">All users</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{userData?.length}</span>
                  </a>
              </li>}

              { data?.role === 'superadmin' && <li onClick={() => onNavItemClick("customer")}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <FaRegUser />
                    <span className="flex-1 ms-3 whitespace-nowrap">Customer</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{filterCustomer?.length}</span>
                  </a>
              </li>}

              { data?.role === 'superadmin' && <li onClick={() => onNavItemClick("merchant")}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <GiRoundStar/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Merchant</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{filterMerchant?.length}</span>
                  </a>
              </li>}

              { data?.role === 'superadmin' && <li onClick={() => onNavItemClick("delivery-man")}>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <RiUserStarLine/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Delivery Man</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{filterDeliveryMan?.length}</span>
                  </a>
              </li>}

              <li>
                  <button onClick={() => logoutHandler()} className=' bg-red-600 hover:bg-red-800 p-3 w-full text-white rounded-md '>Logout</button>
              </li>
              
            </ul>
        </div>
      </aside>

      

    </>
  )
}

export default Sidebar