import { BsFillClockFill } from "react-icons/bs"; 
import { MdEmail } from "react-icons/md"; 
import { AiFillPhone } from "react-icons/ai"; 
import { FaMapMarkerAlt } from "react-icons/fa"; 
import banner from "../../assets/banner.png"
import facebook from "../../assets/facebook.png"
import instagram from "../../assets/instagram.png"
import tiktok from "../../assets/tik-tok.png"
import twitter from "../../assets/twitter.png"
import youtube from "../../assets/youtube.png"
import { Link } from "react-router-dom"
import  { useRef, useState, React } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

const Contact = () => {

  const bannerBtn = [
    {
      id: 1,
      href: null,
      icons: facebook,
      title: "tosnham official",
    },
    {
      id: 2,
      href: null,
      icons: youtube,
      title: "tosnham official",
    },
    {
      id: 3,
      href: null,
      icons: instagram,
      title: "tosnham official",
    },
    {
      id: 4,
      href: null,
      icons: twitter,
      title: "tosnham official",
    },
    {
      id: 5,
      href: null,
      icons: tiktok,
      title: "tosnham official",
    },
  ]

  const informationLink = [
    {
      id: 1,
      icons: <FaMapMarkerAlt size={25}/>,
      style: "text-red-500",
      title: "Address",
      subtitle: "Phnom Penh #1, Street 96 Sangkat Wat Phnom Khan Daun Penh, Phnom Penh",
      href: null,
    },
    {
      id: 2,
      icons: <AiFillPhone size={25}/>,
      style: "text-green-500",
      title: "Phone",
      subtitle: "+855 168 168 168",
      href: null,
    },
    {
        id: 3,
        icons: <MdEmail size={25}/>,
        style: "text-blue-500",
        title: "Email",
        subtitle: "tosnham123@gmail.com",
        href: "mailto:tosnham123@gmail.com",
    },
  ]

  const informationLink2 = [
    {
      id: 1,
      icons: <BsFillClockFill size={25}/>,
      style: "text-amber-400",
      title: "Monday to Friday",
      subtitle: "8AM - 6PM",
      href: null,
    },
    {
      id: 2,
      icons: <BsFillClockFill size={25}/>,
      style: "text-red-500",
      title: "Saturday to Sunday",
      subtitle: "close",
      href: null,
    },

  ]

  const form = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await emailjs.sendForm('service_c73vixh', 'template_fozuoe5', form.current, 'qr1z-cQlS7RcjasL7')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset();
    toast.success('Your message has been sent successfully');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader/>}

      <div className='w-full max-h-full bg-gradient-to-b from-purple-50 to bg-purple-100'>

        {/* banner section */}
        <div className='relative w-full h-[400px]' >
            <img className='object-cover w-full h-full' src={banner} alt="banner" />
            <div className='bg-black opacity-50 w-full h-full absolute top-0 left-0'></div>
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-2/3 font-bold drop-shadow-md italic text-center capitalize text-gray-300 ">
                <div className='flex justify-between items-center md:gap-5 gap-2 w-full mx-auto min-w-[270px]'>
                    <p className='w-[80%] h-full text-sm sm:text-xl'>Contact Us</p>
                    <div className='w-full h-full grid grid-cols-2 place-content-center gap-2'>
                      {bannerBtn.map(({id, icons, href, title}) => (
                        <Link key={id} to={href} target='_blank'>
                            <div className='flex items-center gap-1 bg-black bg-opacity-50 p-2 rounded-lg drop-shadow-lg shadow-md cursor-pointer hover:scale-105 duration-100 ease-linear'>
                              <img className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10' src={icons} alt="social media picture" />
                              <p className='text-xs md:text-base'>{title}</p>
                            </div>
                        </Link>
                      ))}
                    </div>
                </div>
            </div>
        </div>

        {/* body section */}
        <div className='p-4 h-full w-full'>

            {/* contact us */}
            <div className='grid grid-cols-1 gap-10 md:gap-0 md:grid-cols-2'>

                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-5 ">
                      <p className="text-3xl tracking-widest font-bold drop-shadow-sm text-purple-950">Our Office</p>
                      <div>
                        <div className="flex flex-col gap-2">
                            {informationLink.map(({id, href, icons, style, title, subtitle}) => (
                                <div key={id}>
                                  <div className="group flex items-center w-fit gap-2">
                                    <div className={`duration-200 ease-in group-hover:scale-125 ${style}`}>{icons}</div>
                                    <p className="font-bold text-purple-400 drop-shadow-sm">{title}: <span className="text-gray-500 text-sm">{subtitle}</span></p>
                                  </div>
                                </div>
                            ))}
                        </div>
                      </div>
                  </div>

                  <div className="flex flex-col gap-5">
                      <p className="text-3xl tracking-widest font-bold drop-shadow-sm text-purple-950">Working Hours</p>
                      <div>
                        <div className="flex flex-col gap-2">
                            {informationLink2.map(({id, href, icons, style, title, subtitle}) => (
                                <div key={id}>
                                  <div className="group flex items-center w-fit gap-2">
                                    <div className={`duration-200 ease-in group-hover:scale-125 ${style}`}>{icons}</div>
                                    <p className="font-bold text-purple-400 drop-shadow-sm">{title}: <span className="text-gray-500 text-sm">{subtitle}</span></p>
                                  </div>
                                </div>
                            ))}
                        </div>
                      </div>
                  </div>
                </div>

              {/* form */}
              <form ref={form} onSubmit={sendEmail} className="place-self-center h-fit w-full max-w-sm">
                <div className="flex flex-col items-center justify-center w-full max-w-2xl px-5 py-10 mx-auto bg-purple-950 rounded-lg shadow">
                    <div className="mb-6 text-3xl font-light text-center text-purple-200">
                        Contact us !
                    </div>
                    <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                        <div className="col-span-2 lg:col-span-1">
                            <div className=" relative ">
                                <input name="user_name" type="text" id="contact-form-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name"/>
                                </div>
                            </div>
                            <div className="col-span-2 lg:col-span-1">
                                <div className=" relative ">
                                    <input name="user_email" type="email" id="contact-form-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email"/>
                                    </div>
                                </div>
                            <div className="col-span-2">
                                <label className="text-gray-700">
                                    <textarea name="user_message" className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" rows="5" cols="40" placeholder="Enter your comment">
                                    </textarea>
                                </label>
                            </div>
                            <div className="col-span-2 text-right">
                                <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                  {isLoading ? 'Loading...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>

        {/* footer section */}
        <Footer />
    </div>
    </>
    
  )
}

export default Contact