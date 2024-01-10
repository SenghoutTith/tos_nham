import { AiOutlineEye } from "react-icons/ai"; 
import { AiOutlineEyeInvisible } from "react-icons/ai"; 
import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/features/auth/userApiSlice"
import Loader from '../../components/Loader'
import { setCredentials } from "../../redux/features/auth/AuthSlice";

const Register = () => {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      cpassword: '',
      phonenumber: '',
    })

    const {name, email, password, cpassword, phonenumber} = formData

    const [see, setSee] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)
    const [registerApiCall, { isLoading }]  = useRegisterMutation()

    const registerUser = async (e) => {
       try {
          e.preventDefault();
          if(password !== cpassword){
            toast.error("Passwords do not match")
          }else{
            const res = await registerApiCall(formData).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Registered Successfully")
            console.log("userInfo", userInfo)
            navigate('/')
          }
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

    const handleSubmit = (e) => {

      const {name, value} = e.target

      setFormData({...formData, [name]: value})
    }

    useEffect(() => {
      if(userInfo){
        navigate('/')
      }
    },[userInfo, navigate])

  return (
    <>
      {isLoading && <Loader />}
      <div className='w-full min-h-screen flex justify-center items-center pt-40 pb-20 '>
        <div className="max-w-[800px] md:w-1/2 w-[90%] mx-auto relative bg-white shadow-md p-5 rounded-2xl">
          <div className=" absolute overflow-hidden left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl -top-2 mb-4 w-40 h-28 md:w-56 md:h-40 bg-red-500">
            <img className="object-cover w-full h-full" src={logo} alt="logo"/>
          </div>
          <form onSubmit={registerUser} className='flex flex-col gap-5 mt-20 text-gray text-gray-500'>
            <div className='flex flex-col'>
                <label htmlFor='name' className='text-xs'>Name:</label>
                <input value={name} id="name" name='name' autoComplete="on" onChange={handleSubmit} className='rounded-xl border border-gray-200 outline-none p-2 text-sm bg-transparent' type="text" placeholder='name'/>
            </div>

            <div className='flex flex-col'>
                <label htmlFor='email' className='text-xs'>Email:</label>
                <input value={email} id="email" name='email' autoComplete="on" onChange={handleSubmit} className='rounded-xl border border-gray-200 outline-none p-2 text-sm bg-transparent' type="text" placeholder='email'/>
            </div>
              
            <div className='flex flex-col relative'>
                <label htmlFor='password' className='text-xs'>Password:</label>
                <input value={password} id="password" name='password' onChange={handleSubmit} className='rounded-xl border border-gray-200 outline-none p-2 text-sm bg-transparent' type={see ? "text" : "password"} placeholder='password'/>
                <div onClick={() => setSee(!see)} className={`absolute -translate-x-1/2 -translate-y-1/2 top-[65%] right-0 ${see && "opacity-50"}`}>
                  {see ? <AiOutlineEye size={27}/> : <AiOutlineEyeInvisible size={27} />}
                </div>
            </div>

            <div className='flex flex-col relative'>
                <label htmlFor='cpassword' className='text-xs'>Confirm password:</label>
                <input value={cpassword} id="cpassword" name='cpassword' onChange={handleSubmit} className='rounded-xl border border-gray-200 outline-none p-2 text-sm bg-transparent' type={see ? "text" : "password"} placeholder='password'/>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="phonenumber" className='text-xs'>Phone number:</label>
                <input value={phonenumber} id="phonenumber" name='phonenumber' autoComplete="on" onChange={handleSubmit} className='rounded-xl border border-gray-200 outline-none p-2 text-sm no-arrows bg-transparent' type="number" placeholder='phone number'/>
            </div>

            <button className='rounded-xl w-full text-xs bg-gray-500 text-white font-bold py-3' type="submit">Sign up</button>

            <div className='flex gap-3'>
                <p>Alreay have an account?</p>
                <Link to={"/user/login"} className='font-bold text-black'>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register