import { MdDeliveryDining } from "react-icons/md"; 
import { AiOutlineSearch } from "react-icons/ai"; 
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai"; 
import React, { useEffect, useState } from "react";
import { useGetProductQuery } from "../../redux/features/productApiSlice";
import { useAddToCartMutation, useGetAllUsersQuery } from "../../redux/features/userApiSlice";
import { productSlider, categories } from "../../data/data";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils/utils";
import { toast } from "react-toastify";
import { Link as ScrollLink } from "react-scroll";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

const googleMapPic = "https://img.freepik.com/free-vector/location_53876-25530.jpg?w=1060&t=st=1704300812~exp=1704301412~hmac=41fd687e1edf863b93938a1d1d4ee91631e6e78063daa9e9d0305bf3513cb81b"

const Shop = () => {

  const { data}  = useGetProductQuery("")

  const { data: allUsers} = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true})

  const [currentSlide, setCurrentSlide] = useState(0)

  //create next slide
  const nextSlide = () => {
    setCurrentSlide(currentSlide === productSlider.length - 1 ? 0 : currentSlide + 1)
  }

  //create prev slide
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? productSlider.length - 1 : currentSlide - 1)
  }

  //create dot slide
  const dotSlide = (index) => {
    setCurrentSlide(index)
  }

  const [addToCartApiCall] = useAddToCartMutation()

  const addToCart = async (product) => {
    try {
      const res = await addToCartApiCall({
        ...product,
        amount: 1,
        productId: product._id,
      }).unwrap()

      toast.success("Added to Cart")
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide === productSlider.length - 1 ? 0 : currentSlide + 1)
    }, 5000)
    return () => clearInterval(interval)
  }
  , [currentSlide])

  return (
    <>
      <div className='w-full max-h-full bg-gradient-to-b '>
        {/* banner section */}
        <div className='flex w-full h-[200px] md:h-[400px] my-20 relative bg-gradient-to-r from-purple-900 to-violet-400 p-5 ' >
          {productSlider.map(({title, imgSrc, id}) => (
              <div key={id} className={`${id === currentSlide ? "opacity-100 duration-500 ease-in-out" : "opacity-0 duration-500 ease-in-out"} relative `}>
                  {id === currentSlide && (
                    <>
                      <img className='object-cover w-full h-full' src={imgSrc} alt={title} />
                      <div onClick={() => prevSlide()} className="absolute top-[50%] left-5  -translate-y-[50%] text-gray-600 animate-pulse drop-shadow-xl"><AiOutlineDoubleLeft className="text-[30px] md:text-[38px]" /></div>
                      <div onClick={() => nextSlide()} className="absolute top-[50%] right-5  -translate-y-[50%] text-gray-600 animate-pulse drop-shadow-xl"><AiOutlineDoubleRight className="text-[30px] md:text-[38px]"/></div>
                    </>
                  )}
              </div>
          ))}
          <div className='absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2'>
              {productSlider.map(({id}) => (
                  <div onClick={() => dotSlide(id)} key={id} className={`md:w-3 md:h-3 w-2 h-2 bg-black rounded-full ${id === currentSlide ? "opacity-100" : "opacity-40" }`}></div>
              ))}
            </div>
        </div>

        {/* body section */}
        <div className='p-4 h-full w-full '>
              <div>
                  <form>
                      <div className="flex justify-center w-full">
                        <div className=" w-14 h-14 bg-gray-600 text-white flex justify-center items-center rounded-s-full ring-2 ring-gray-600" >
                          <AiOutlineSearch size={25}/>
                        </div>
                        <input className="pl-4 rounded-r-full w-full md:w-1/2 outline-none ring-2 ring-gray-600 focus:ring-purple-600" type="text" placeholder="Search" />
                      </div>
                  </form>
              </div>
        </div>
      </div>

      {/* category */}
      <div className="p-5">
          <p className="text-xl md:text-3xl tracking-wider font-extralight p-5 text-black">Category:</p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-5 place-items-center">
                {categories.map(({id, img, category}) => (
                    <ScrollLink key={id} smooth duration={700} to={category}>
                      <div className="mx-auto relative w-[80%] md:w-[70%] shadow-md rounded-xl overflow-hidden">
                        <img className="brightness-90 contrast-100 saturate-100" src={img} alt="pic" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <p className="text-3xl font-abc drop-shadow-2xl text-shadow-lg shadow-black text-white">{category}</p>
                        </div>
                      </div>
                    </ScrollLink>
                ))}
          </div>
      </div>


      {/* popular restaurant */}
      <div className="p-5 text-black">
          <p className="text-xl md:text-3xl tracking-wider font-extralight p-5">Popular Restaurant:</p>
          <div className="flex gap-3 md:gap-5 overflow-scroll">
            <div>
              <div className="md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounded-full overflow-hidden">
                <img className="w-full h-full object-cover hover:scale-110 duration-200 ease-in-out" src={googleMapPic} alt="logo" />
              </div>
              <p className="text-center">Phnom Penh</p>
            </div>
            {allUsers?.filter(({ product }) => product.products.length > 0).map(({ brand, product }, index) => (
                <div key={index}>
                    <div className="md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounded-full overflow-hidden">
                        <img className="w-full h-full object-cover hover:scale-110 duration-200 ease-in-out" src={product.products[0].image} alt="logo" />
                    </div>
                    <p className="text-center">{brand}</p>
                </div>
            ))}
          </div>
      </div>

      <div className="p-5 text-black">
          <p className="text-3xl tracking-wider font-bold p-5 text-center">Explore Food</p>
      </div>


      {/* catergory of foods */}
      <Card category="pizza" />
      <Card category="drink" />
      <Card category="noodle" />
      <Card category="hamburger" />

      {/* all foods */}
      <div className="p-5 text-black">
            <div name="all" className="py-10"></div>
            <p className="text-3xl tracking-wider font-extralight p-5">All Foods:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                {data?.map((product) => (
                    <div key={product._id} className="w-full h-full flex flex-col bg-gray-400">
                        <Link to={`/${product._id}`}>
                          <div className="relative w-full h-[150px]">
                              <img className="w-full h-[150px] object-cover bg-white" src={product.image} alt="image" />
                              <p className='absolute px-1 py-2 md:px-3 rounded-l-2xl bg-black/50 -bottom-2 shadow-lg right-0 z-1 text-base md:text-xl font-bold text-green-500'>${product.price}</p>
                          </div>
                        </Link>
                        <div className="flex flex-col px-5 h-full">
                            <p className="text-[10px] py-1">{product.brand}</p>
                            <p className="text-[18px] font-bold">{shortenText(product.name, 10)}</p>
                            <p className="text-[13px]">{shortenText(product.description, 30)}</p>
                        </div>
                        <div className="flex justify-between px-3 py-2 gap-5">
                            <div className="flex h-full w-1/3 justify-start items-end relative">
                                <MdDeliveryDining className="absolute left-0 bottom-[2px]" size={19}/>
                                <p className="ml-5">$1</p>
                            </div>
                            <button onClick={() => addToCart(product)} className="w-full h-full py-1 md:py-2 text-xs md:text-base bg-amber-500 hover:bg-amber-500/70 text-white rounded-md" type="button">Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      <div className="w-full h-[300px] bg-slate-800 relative my-5">
          <p className="text-transparent text-3xl font-abc absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-clip-text bg-gradient-to-r from-purple-500 via-purple-200 to-purple-600">Thank you for visiting our Food Website!</p>
      </div>

      <div className="pt-5">
        <Footer />
      </div>
      
    </>
  );
};

export default Shop;