import { MdRestaurantMenu } from "react-icons/md"; 
import React from 'react'
import { useGetProfileQuery } from '../../redux/features/userApiSlice'
import { convertToCambodiaTime } from '../../utils/utils';

const Notification = () => {

    const { data } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true })

  return (
    <>
       <div className={`p-20 ${data?.history.length >= 1 ? 'h-full' : 'h-screen'}`}>
            <h1 className='text-2xl font-bold py-5 text-black'>Notification</h1>
              {data?.history.length > 1 ? <div className="flex flex-col gap-5">
                {data?.history.slice().reverse().map(({ data: { product = [], brand, status, totalAmount, totalPrice, createdAt }, index }) => (
                  <div className={`bg-gray-400 overflow-hidden rounded-md `} w-full h-full key={index}>
                    <div className="flex items-center justify-between w-full bg-gray-300 p-3">
                      <div className="flex items-center gap-3">
                        <MdRestaurantMenu size={30} />
                        <p className='w-full text-3xl tracking-wider'>{brand}</p>
                      </div>
                      <p className={`text-xl 
                      ${
                        status === 'pending' ? 'text-yellow-500 animate-pulse' : 
                        status === 'accept' ? 'text-green-500 animate-pulse' : 
                        status === 'success' ? 'text-green-500' : 
                        status === 'delivery' ? 'text-blue-500 animate-pulse' :
                        'text-red-500'}`
                        }>
                        <span className="text-gray-600">Status:</span> {status} 
                        {status === 'success' ? '' : <span className={`${status === 'pending' || 'accpet' || 'delivery' && 'fade-ellipsis'}`}>.<span>.</span><span>.</span></span> }
                        
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 p-3">
                      {product.map(({ name, image, price, total, amount }, productIndex) => (
                        <div key={productIndex} className='w-full h-full shadow-lg rounded-md overflow-hidden'>
                          <div className='flex w-full bg-white p-2'>
                            <div className='w-32 h-32 rounded-md'>
                              <img src={image} alt={name} className='w-full h-full object-cover rounded-md' />
                            </div>
                            <div className='flex flex-col w-full justify-around px-5'>
                              <p>{name}</p>
                              <p>Price: ${price}</p>
                              <p>Amount: {amount}</p>
                              <div className='w-full flex justify-between'>
                                <p>{convertToCambodiaTime(createdAt)}</p>
                                <p>Total: ${total}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className='flex gap-5 text-white text-shadow-lg'>
                        <p className='text-xl font-bold'>Total Amount: {totalAmount}</p>
                        <p className='text-xl font-bold'>Total Price: ${parseFloat(totalPrice).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              : <div className="flex flex-col items-center justify-center h-full">
                  <p className='text-2xl font-bold'>No Notification</p>
                </div> }
        </div>



    </>
  )
}

export default Notification