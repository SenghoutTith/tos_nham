
import { HiLightBulb } from "react-icons/hi"; 
import { FaUserShield } from "react-icons/fa"; 
import { MdDeliveryDining } from "react-icons/md"; 
import { FaRegHandshake } from "react-icons/fa"; 
import { RiHandHeartFill } from "react-icons/ri"; 
import React from 'react'
import banner from "../assets/banner.png"
import logo from "../assets/logo.png"
import pic1 from "../assets/pic1.png"
import Footer from "../components/Footer";


const About = () => {

    const tasks = [
        {
            id: 1,
            icons: <RiHandHeartFill className="text-red-500" size={80}/>,
            title: "Passion",
            subtitle: "There is much to be expressed to show our LOVE for our customers. We are showing our greatest care to all of our super-app users and having their WOW expressions by providing reliable lifestyle services.",
        },
        {
            id: 2,
            icons:<FaRegHandshake className="text-red-500" size={80}/>,
            title: "Collaborative",
            subtitle: "There is much to be expressed to show our LOVE for our customers. We are showing our greatest care to all of our super-app users and having their WOW expressions by providing reliable lifestyle services.",
        },
        {
            id: 3,
            icons: <MdDeliveryDining className="text-red-500" size={80}/>,
            title: "Fast Response",
            subtitle: "There is much to be expressed to show our LOVE for our customers. We are showing our greatest care to all of our super-app users and having their WOW expressions by providing reliable lifestyle services.",
        },
        {
            id: 4,
            icons: <FaUserShield className="text-red-500" size={80}/>,
            title: "Responsibile",
            subtitle: "There is much to be expressed to show our LOVE for our customers. We are showing our greatest care to all of our super-app users and having their WOW expressions by providing reliable lifestyle services.",
        },
        {
            id: 5,
            icons:<HiLightBulb className="text-red-500" size={80}/>,
            title: "Simple",
            subtitle: "There is much to be expressed to show our LOVE for our customers. We are showing our greatest care to all of our super-app users and having their WOW expressions by providing reliable lifestyle services.",
        },
        
    ]

  return (
    
    <div className='w-full max-h-full bg-gradient-to-b from-purple-50 to bg-purple-100'>

        {/* banner section */}
        <div className='relative w-full h-[400px]' >
            <img className='object-cover w-full h-full' src={banner} alt="" />
            <div className='bg-black opacity-50 w-full h-full absolute top-0 left-0'></div>
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-2/3 font-bold drop-shadow-md italic text-center capitalize text-gray-300 ">
                <div className="w-full mx-auto min-w-[270px]">
                    <p>welcome to TosNham, available in <span className=" font-bold text-transparent bg-gradient-to-r from-blue-800 via-gray-300 to-red-600 bg-clip-text">cambodia</span> now.</p>
                    <p>Check out our menu below.</p>
                </div>
            </div>
        </div>

        {/* body section */}
        <div className='p-4 h-full w-full'>

            {/* about us */}
            <div className='mb-20 flex flex-col gap-2'>
                <p className='text-purple-950 text-3xl font-bold tracking-widest border-purple-950 border-b-2 border-r-2 shadow-xl'>About Us</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 place-items-center'>
                    <div className="flex flex-col gap-5 md:gap-0 justify-between items-center w-full h-full ">
                        <p className='tracking-wide text-base drop-shadow-sm text-gray-600 font-bold'>
                            <span className='text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text'>TosNham</span> is the first lifestyle service providing a SUPER APP in Cambodia. It integrates Food Delivery services, Online Shopping, Payment Services, and Local Services. Additionally, Entertainment for the online game top-up, travel services, and phone top-ups. Take advantage of the online Easy Life; EVERYTHING ON TOSNHAM WEBSITE!
                        </p>
                        <div className="tracking-wide text-base drop-shadow-sm text-gray-600 font-bold">
                            <p><span className="text-purple-950 font-bold text-xl">Mission:</span> "Make life easy" </p>
                            <p><span className="text-purple-950 font-bold text-xl">Vision:</span> "Become the Largest Lifestyle Services Provider in South-East Asia"</p>
                        </div>
                    </div>
                        <div className= 'flex-1 w-2/3 h-full  '>
                            <img className='object-contain w-full h-full justify-center items-start ' src={logo} alt="logo" />
                        </div>
                </div>
            </div>

            {/* service */}
            <div className='mb-20 flex flex-col gap-2'>
                <p className='text-purple-950 text-3xl font-bold tracking-widest border-purple-950 border-b-2 border-r-2 shadow-xl'>Our Services</p>
                <div className='flex flex-col md:flex-row gap-5 justify-center items-center '>
                    <div className= 'flex flex-1 w-full h-full justify-center items-center'>
                        <img className='object-contain w-2/3 h-full justify-center items-start' src={pic1} alt="pic 1" />
                    </div>
                    <div className='flex flex-1 flex-col tracking-wide text-base drop-shadow-sm text-gray-600 font-bold'>
                        <p>
                        <span className='text-red-500 italic underline underline-offset-2'>Problem:</span> Nowadays all people around the world
                        are very busy sometime they can't have enough
                        times for cook something to eat by themselves.
                        that why some people got sick and stressed
                        because they don't eat enough they spent
                        around 2/3 of their daily life at work.
                        </p>
                        <br />
                        <p>
                        <span className='text-green-500 italic underline underline-offset-2'>Solution:</span> To solve this problem we was create this
                        service that help peoples avoid from this problem. This service call "Tos Nham" mean "let eat". Our Tos Nham was create to provide a delivery service to delivery food for everyone, you just
                        food that your want and click order our deliver will take it to you and you have to go any restaurant just wait at your home.
                        </p>
                    </div>
                </div>
            </div>

            {/* task */}
            <div className='mb-20 flex flex-col gap-2'>
                <p className='text-purple-950 text-3xl font-bold tracking-widest border-purple-950 border-b-2 border-r-2 shadow-xl'>TosNham Task</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-evenly items-center content-evenly justify-items-center'>
                    {tasks.map(({id, icons, title, subtitle}) => (
                        <div key={id} className= 'flex gap-3 flex-col items-center w-[80%] md:w-full h-full  tracking-wide text-base drop-shadow-sm text-gray-600 font-bold'>
                            <div>{icons}</div>
                            <p className="text-3xl text-purple-950">{title}</p>
                            <p className="text-center md:text-start">{subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* footer section */}
        <Footer />
    </div>
  )
}

export default About