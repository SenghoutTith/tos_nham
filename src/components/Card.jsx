import React from 'react'
import { useGetProductQuery } from '../redux/features/auth/productApiSlice'
import { shortenText } from '../utils/utils'
import { MdDeliveryDining } from "react-icons/md"; 
import Loader from './Loader';
import { useAddToCartMutation } from '../redux/features/auth/userApiSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Card = ({ category }) => {

    const { isLoading, isError, isSuccess, data, error}  = useGetProductQuery()

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

  return (
    <>
        {isLoading && <Loader />}
        <div className="p-5 text-black">
            <div name={category} className="md:py-10"></div>
            <p className="text-3xl tracking-wider font-extralight p-5">{category}:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {data?.filter(product => product.category === category).map((product) => (
                    <div key={product._id} className="w-full h-full flex flex-col bg-gray-400">
                        <Link to={`/${product._id}`}>
                          <div className="relative w-full h-[250px]">
                              <img className="w-full h-[250px] object-cover bg-white" src={product.image} alt="image" />
                              <p className='absolute px-3 py-2 rounded-l-2xl bg-black/50 -bottom-2 shadow-lg right-0 z-1 text-3xl font-bold text-green-500'>${product.price}</p>
                          </div>
                        </Link>
                        <div className="flex flex-col px-5 h-full">
                            <p className="text-xs py-1 relative">{product.brand}</p>
                            <p className="text-xl font-bold">{product.name}</p>
                            <p className="text-[15px]">{shortenText(product.description, 60)}</p>
                        </div>
                        <div className="flex justify-between px-5 py-2 gap-5">
                            <div className="flex h-full w-1/3 justify-start items-end relative">
                                <MdDeliveryDining className="absolute left-0 bottom-[2px]" size={19}/>
                                <p className="ml-5">$1</p>
                            </div>
                            <button onClick={() => addToCart(product)} className="w-full h-full py-3 bg-amber-500 hover:bg-amber-500/70 text-white rounded-md" type="button">Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )  
}

export default Card