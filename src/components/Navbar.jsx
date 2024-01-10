import { GiRoundStar } from "react-icons/gi"; 
import { RiUserStarLine } from "react-icons/ri"; 

import { MdOutlineMailOutline } from "react-icons/md"; 
import { FaRegHandshake } from "react-icons/fa"; 
import { BsPeople } from "react-icons/bs"; 
import { BiCartAlt } from "react-icons/bi"; 
import { AiOutlineClose } from "react-icons/ai"; 
import { AiOutlineMenu } from "react-icons/ai"; 
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

import { logout } from "../redux/features/auth/AuthSlice";
import { useGetProfileQuery, useLogoutMutation } from "../redux/features/auth/userApiSlice";
import { toast } from "react-toastify";
import { shortenText } from "../utils/utils";

const Navbar = () => {

    const [click, setClick] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)

    const [ logoutApiCall, {isLoading} ] = useLogoutMutation()

    const { data: userProfile } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            toast.success('Logout Successfull')
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    const navs = [
        {
            id : 1,
            icons: <BiCartAlt size={20}/>,
            title : "Shop",
            href: "/",
        },
        {
            id : 2,
            icons: <BsPeople size={20}/>,
            title : "About Us",
            href: "/about_us",
        },
        {
            id : 3,
            icons: <FaRegHandshake size={20}/>,
            title : "Be Our Partner",
            href: "/be_our_partner",
        },
        {
            id : 4,
            icons: <MdOutlineMailOutline size={20}/>,
            title : "Contact Us",
            href: "/contact_us",
        }
    ]

  return (
    <>
        {isLoading && <Loader />}
        <div className='relative z-[100] w-full'>
            <div className='fixed px-7 md:px-10 mx-auto top-0 left-1/2 -translate-x-1/2 shadow-md bg-black bg-opacity-80 flex justify-between items-center max-w-[1600px] w-full h-20'>
                <div className='flex items-center text-white'>
                    <img className='rounded-full w-12 h-12' src={logo} alt="logo" />
                    <p className='font-bold text-transparent bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text'>TosNham.</p>
                </div>

                <ul className='hidden md:flex items-center justify-evenly h-10 min-w-fit w-2/3 text-gray-300'>
                    {navs.map(({id, title, href}) => (
                        <Link
                        to={href}
                        key={id}>
                            <li className={`border-b-transparent border-b-2 cursor-pointer duration-100 ease-in hover:font-bold hover:text-white hover:scale-105 hover:border-b-purple-400`}>
                                {title}
                            </li> 
                        </Link>
                    ))}

                    {userInfo && userInfo.role === "admin" ? (
                        <Link to={"/admin/dashboard"}>
                            <li className='items-center gap-2 flex p-3 bg-green-500 text-white font-bold text-shadow-lg rounded-md animate-pulse hover:animate-none hover:scale-105 duration-200 ease-linear'>
                                <p>Admin</p>
                                <GiRoundStar size={20}/>
                            </li>
                        </Link>
                        )
                        : null
                    }

                    {userInfo && userInfo.role === "deliveryman" ? (
                        <Link to={"/deliveryman/dashboard"}>
                            <li className='items-center gap-2 flex p-3 bg-amber-500 text-white font-bold text-shadow-lg rounded-md animate-pulse hover:animate-none hover:scale-105 duration-200 ease-linear'>
                                <p>Delivery</p>
                                <RiUserStarLine size={20}/>
                            </li>
                        </Link>
                        )
                        : null
                    }

                    {userInfo && 
                        <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
                            <div 
                                tabIndex={0} 
                                role="button" 
                                className="btn bg-purple-950 text-white shadow-lg border-none"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className=" flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full overflow-hidden"><img src={userInfo.photo} alt="img" className="object-cover" /></div>
                                    <div className="flex flex-col">
                                        <p>Welcome!</p>
                                        {shortenText(userInfo.name, 8)}
                                    </div>
                                </div>
                            </div>
                            <ul 
                                tabIndex={0} 
                                className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${isDropdownOpen ? 'block' : 'hidden'}`}
                            >
                                <li> <Link to={'/user/profile'} onClick={() => setIsDropdownOpen(false)}>Profile</Link> </li>
                                <li> <Link to={'/notification'} onClick={() => setIsDropdownOpen(false)}>History</Link> </li>
                                <li> <Link to={'/user/login'} onClick={() => {logoutHandler(); setIsDropdownOpen(false);}}>Logout</Link> </li>
                            </ul>
                        </div>
                    }

                    {!userInfo && <Link to={"/user/login"}>
                        <li className='border-b-transparent border-b-2 cursor-pointer duration-100 ease-in hover:font-bold hover:text-white hover:scale-105 hover:border-b-purple-400'>
                            <p>Log in</p>
                        </li>
                    </Link>}

                    <Link to={"/profile/cart"}>
                        <li className='relative flex items-center border-b-transparent border-b-2 cursor-pointer duration-100 ease-in hover:font-bold hover:text-white hover:scale-105 hover:border-b-purple-400'>
                            <p>Cart</p>
                            <BiCartAlt size={25}/>
                            {userProfile?.cart.items.length > 0 ? 
                                <div className="absolute w-4 h-4 bg-red-500 text-white text-xs -top-1 -right-2 rounded-full flex justify-center items-center font-medium">
                                    {userProfile?.cart.totalAmount}
                                </div> :
                                null    
                            }
                        </li>
                    </Link>
                </ul>

                <div onClick={() => setClick(!click)} className="flex md:hidden text-white cursor-pointer">
                    {click ? 
                        <div className="flex gap-2">
                            <p>Close</p>
                            <AiOutlineClose size={25}/>
                        </div> 
                        : <AiOutlineMenu size={25}/>
                    }
                </div>

                <div className={`py-4 px-2 flex md:hidden w-1/2 h-screen bg-gradient-to-b from-purple-950 to-gray-950 absolute top-0 duration-500 ease-in z-50 ${click ? 'left-0' : 'left-[-100%]'} `}>
                        <ul className='flex flex-col md:hidden gap-3 text-sm text-gray-400 w-full'>
                        {navs.map(({id, icons, title, href}) => (
                            <Link to={href} key={id} onClick={() => setClick(!click)}>
                                <li className='flex items-center gap-2 cursor-pointer duration-100 ease-in hover:font-bold hover:text-white hover:scale-105 hover:bg-black hover:bg-opacity-20 px-2 py-2'>
                                    <p>{title}</p>
                                </li>
                                <hr className="my-1"/>
                            </Link>
                        ))}

                        <Link to={"/profile/cart"} onClick={() => setClick(!click)}>
                        <li className='flex relative items-center gap-2 cursor-pointer duration-100 ease-in hover:font-bold hover:text-white hover:scale-105 hover:bg-black hover:bg-opacity-20 px-2 py-2'>
                                <p>Cart</p>
                                <BiCartAlt  size={25}/>
                                {userProfile?.cart.items.length > 0 ? 
                                    <div className="absolute w-4 h-4 bg-red-500 text-white text-xs top-1 left-14 rounded-full flex justify-center items-center font-medium">
                                        {userProfile?.cart.totalAmount}
                                    </div> :
                                    null    
                                }
                            </li>
                            <hr className="my-1"/>
                        </Link>

                        {!userInfo && <Link to={"/user/login"} onClick={() => setClick(!click)}>
                            <li className='flex items-center gap-2 cursor-pointer duration-100 ease-in hover:font-bold hover:text-white hover:scale-105 hover:bg-black hover:bg-opacity-20 px-2 py-2'>
                                <p>Log in</p>
                            </li>
                            <hr className="my-1"/>
                        </Link>}

                        </ul>
                    
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Navbar