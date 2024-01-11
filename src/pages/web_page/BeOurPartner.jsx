import { AiOutlineArrowDown } from "react-icons/ai"; 
import { FiArrowRightCircle } from "react-icons/fi"; 
import React, { useRef, useState } from 'react'
import banner from "../../assets/pic3.avif"
import Footer from "../../components/Footer"
import { Link } from "react-scroll";
import emailjs from '@emailjs/browser';
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const BeOurPartner = () => {

  const form = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await emailjs.sendForm('service_c73vixh', 'template_djkpry7', form.current, 'qr1z-cQlS7RcjasL7')
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
      {isLoading && <Loader />}

      <div className='w-full max-h-full bg-gradient-to-b from-purple-50 to bg-purple-100'>

      {/* banner section */}
      <div className='relative w-full h-[400px]' >
          <img className='object-cover w-full h-full' src={banner} alt="banner logo" />
          <div className='bg-black opacity-50 w-full h-full absolute top-0 left-0'></div>
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] md:w-2/3 w-full font-bold drop-shadow-md italic text-center capitalize text-gray-300 ">
              <div className='flex justify-evenly items-center md:gap-5 gap-2 w-full mx-auto min-w-[280px]'>
                  <div>
                    <p className='text-sm sm:text-xl mb-5'>Become Our Business Partner.</p>
                    <div className="text-xs sm:text-base">
                      <div className="flex items-center gap-3 mb-3 ">
                          <FiArrowRightCircle />
                          <p>Merchant Parnter</p>
                      </div>
                      <div className="flex items-center gap-3">
                          <FiArrowRightCircle />
                          <p>Deliver Parnter</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-5 text-xs sm:text-base">
                    <Link smooth duration={700} to="form_Register">
                      <div className="py-2 px-4 sm:py-4 sm:px-6 bg-gradient-to-r from-purple-950 to-gray-950 text-white w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                        Register Now
                      </div>
                    </Link>
                    <div className="flex">
                      <AiOutlineArrowDown className="text-white animate-bounce" size={25}/>
                      <AiOutlineArrowDown className="text-white animate-bounce" size={25}/>
                      <AiOutlineArrowDown className="text-white animate-bounce" size={25}/>
                    </div>
                  </div>
              </div>
          </div>
        </div>

        {/* body section */}
        <div className='p-4 h-full w-full '>
            <div name="form_Register" className="w-full h-28"></div>
            {/* form register */}
            <form ref={form} onSubmit={sendEmail} className="capitalize bg-white" action="">
              <div className=" w-full h-20 bg-purple-200 flex items-center justify-center shadow-md">
                <p className="text-purple-950 text-3xl font-bold tracking-widest">Become our partner</p>
              </div>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 p-3 ">
                <div>
                  <label htmlFor='full-name' className=" text-black font-bold">full name</label>
                  <input type="text" name='user_fullname' id='full-name' className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm shadow-black text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required/>
                </div>

                <div>
                  <label htmlFor='email' className=" text-black font-bold">email</label>
                  <input type="email" name='user_email' id='email' className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm shadow-black text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required/>
                </div>

                <div>
                  <label htmlFor='phone-number' className=" text-black font-bold">phone number</label>
                  <input type="number" name='user_phonenumber' id='phone-number' className="no-arrows rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm shadow-black text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required/>
                </div>

                <div>
                  <label htmlFor='role' className=" text-black font-bold">Apply for? (Merchant or Delivery)</label>
                  <input type="text" name='user_role' id='role' className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm shadow-black text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required/>
                </div>

                <div>
                  <label htmlFor='shop-name' className=" text-black font-bold">shop name</label>
                  <input type="text" name='user_brand' id='shop-name' className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm shadow-black text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required/>
                </div>


                <div>
                  <label htmlFor='shop-address' className=" text-black font-bold">shop address</label>
                  <input type="text" name='user_address' id='shop-address' className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm shadow-black text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required/>
                </div>

                <div>
                  <label htmlFor='aba-name' className=" text-black font-bold">ABA name</label>
                  <input type="text" name='user_aba_name' id='aba-name' className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm shadow-black text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required/>
                </div>

                <div>
                  <label htmlFor='aba-number' className=" text-black font-bold">ABA 8 digit numbers</label>
                  <input type="number" name='user_aba_number' id='aba-number' className="no-arrows rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm shadow-black text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required/>
                </div>

                <button type="submit" className="p-4 flex items-center justify-center text-xl bg-green-500 hover:bg-opacity-80 text-white font-bold tracking-wide hover:scale-95 duration-100 ease-linear">
                  {isLoading ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </form>

            {/* question and answer */}
            <div className='my-10 flex flex-col gap-2'>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div className="mb-10">
                    <p className='mb-2 text-purple-950 text-3xl font-bold tracking-wider border-purple-950 border-b-2 border-r-2 shadow-xl'>What do I need to do?</p>
                    <div className="flex flex-col gap-4 w-full h-full tracking-wide text-base drop-shadow-sm text-gray-600 font-bold">
                        <p>Prepare your documents:</p>
                        <div className="ml-5">
                          <p>- Business Registration, Business Patent etc. (Optional)</p>
                          <p>- National ID Card or Passport of Business owner. (Must)</p>
                          <div className="flex flex-col">
                            <p>- Digital copies of your:</p>
                            <div className="ml-10">
                              <p>{">"} Store logo 1:1 and store cover photo 9:5 aspect ratios</p>
                              <p>{">"} Menu item photos (1:1 aspect ratio)</p>
                              <p>{">"} Menu catalogue list in excel sheet</p>
                              <p>{">"} Website address and extra information (optional)</p>
                            </div>
                          </div>
                          <p>- You can register your phone number or contact us directly.</p>
                          <p>- <Link to={""} className="text-green-500 hover:text-opacity-50">Sign up online</Link> through our registration link on our website.</p>
                        </div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className='mb-2 text-purple-950 text-3xl font-bold tracking-wider border-purple-950 border-b-2 border-r-2 shadow-xl'>Who Can Apply?</p>
                    <div className="flex flex-col gap-4 md:items-center w-full h-full tracking-wide text-base drop-shadow-sm text-gray-600 font-bold">
                        <p>Companies that have specific location for our driver-partner to pick up from:</p>
                        <div className="ml-5">
                          <p>- Food & beverages for immediate consumption</p>
                          <p>- Convenience, Health & beauty, Bread, cakes & confectionery, Snacks, Alcohol, Ice cream</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

            
        </div>
        {/* footer section */}
        <Footer />
      </div>
    
    </>
    
  )
}

export default BeOurPartner