import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux/features/userApiSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/features/UserSlice'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [loginApiCall, { isLoading }] = useLoginMutation()


  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const res = await loginApiCall({email, password}).unwrap()
      dispatch(setCredentials(res))
      toast.success(res.message || 'Login Successfull')
      navigate('/')
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }
  
  return (
    <>
      {isLoading && <Loader />}
      <div className='w-full min-h-screen flex justify-center items-center pt-40 pb-20 '>
        <div className="max-w-[800px] md:w-1/2 w-[90%] mx-auto relative bg-white shadow-md p-5 rounded-2xl">
          <div className=" absolute overflow-hidden left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl -top-2 mb-4 w-40 h-28 md:w-56 md:h-40 bg-red-500">
            <img className="object-cover w-full h-full" src={logo} alt="logo"/>
          </div>

          <form onSubmit={loginUser} className='flex flex-col gap-5 mt-20 text-gray text-gray-500'>

              <div className='flex flex-col'>
                <label htmlFor='email' className='text-xs'>Email:</label>
                <input value={email} id="email" name='email' autoComplete="on" onChange={(e) => setEmail(e.target.value)} className='bg-transparent rounded-xl border border-gray-200 outline-none p-2 text-sm' type="email" placeholder='email'/>
            </div>

            <div className='flex flex-col relative'>
                <label htmlFor='password' className='text-xs'>Password:</label>
                <input value={password} id="password" name='password' onChange={(e) => setPassword(e.target.value)} className='bg-transparent rounded-xl border border-gray-200 outline-none p-2 text-sm' type="password" placeholder='password'/>
            </div>

              <button className='rounded-xl w-full text-xs bg-gray-500 text-white font-bold py-3' type="submit">SIGN IN</button>

              <div className='flex gap-3'>
                <p>Don't have an account?</p>
                <Link to={"/user/register"} className='font-bold text-black'>Register</Link>
              </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;