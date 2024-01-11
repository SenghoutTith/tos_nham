import React from 'react'
import { useGetAllPaymentsQuery } from '../../redux/features/userApiSlice'
import { convertToCambodiaTime, shortenText } from '../../utils/utils'
import Loader from '../../components/Loader'

const Payment = () => {

    const { data, isLoading } = useGetAllPaymentsQuery({}, { refetchOnMountOrArgChange: 0 })

  return (
    <>
        {isLoading && <Loader />}
    
        <div className='w-[77%] h-full shadow-md sm:rounded-lg mt-[5rem] ml-[17rem] text-black'>
            <p className='text-3xl font-bold'>Payment:</p>
            <div className='flex flex-col gap-7 p-5 justify-center items-center'>
            {data?.slice().reverse().map(({product = [], user = [], paymentOption, _id: orderId, brand, createdAt, status, totalAmount, totalPrice}, index) => (
                <div key={index} className={`${status === 'success' && 'opacity-50'} flex flex-col bg-gray-500 rounded-md overflow-hidden mx-auto w-[80%] h-[80%] shadow-md shadow-black`}>
                    <div className='flex justify-between items-center bg-gray-300 p-3 w-full font-bold'>
                        <p>Company: {brand}</p>
                        <p>Order Id: #{orderId}</p>
                    </div>
                    <div className='flex flex-col gap-5 p-5'>
                        {/* user info */}
                        <div>
                            <p className='text-3xl font-bold'>Customer:</p>
                            {user.map((userInfo, userIndex) => (
                            <div key={userIndex}>
                                <p className='font-bold'>Name: <span className='text-white'>{userInfo.name}</span></p>
                                <p className='font-bold'>Address: <span className='text-white'>{userInfo.street}, </span><span className='text-white'>{userInfo.city}</span></p>
                            </div>
                            ))}
                            <p className='font-bold'>Date: <span className='text-white'>{convertToCambodiaTime(createdAt)}</span></p>
                            <p className='font-bold'>Payment Option: <span className='text-white'>{paymentOption}</span></p>
                        </div>
                        {/* product info */}
                        {product.map(({name, amount, image, price, total, description}, productIndex) => (
                            // product info
                            <div key={productIndex} className= 'w-full h-full bg-slate-700 p-2 text-white rounded-md'>
                                <div className='grid grid-cols-6 w-full border h-[150px] overflow-hidden'>
                                    <div className='w-full h-[150px] border-r'>
                                        <img className='w-full h-full object-cover' src={image} alt="pic" />
                                    </div>
                                    <div className='h-full w-full border-r'>
                                        <p className='text-xl h-fit border-b text-center'>Name</p>
                                        <p className='p-2 font-bold'>{name}</p>
                                    </div>
                                    <div className='h-full w-full border-r'>
                                        <p className='text-xl h-fit border-b text-center'>Description</p>
                                        <p className='p-2 text-xs font-bold'>{shortenText(description, 95)}</p>
                                    </div>
                                    <div className='h-full w-full border-r'>
                                        <p className='text-xl h-fit border-b text-center'>Amount</p>
                                        <p className='p-2 font-bold'>{amount}</p>
                                    </div>
                                    <div className='h-full w-full border-r'>
                                        <p className='text-xl h-fit border-b text-center'>Price</p>
                                        <p className='p-2 font-bold'>${parseFloat(price).toFixed(2)}</p>
                                    </div>
                                    <div className='h-full w-full border-r'>
                                        <p className='text-xl h-fit border-b text-center'>Total</p>
                                        <p className='p-2 font-bold'>${parseFloat(total).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='flex justify-between text-white text-shadow-lg'>
                            <div className='flex gap-5 items-center'>
                                <p className='text-xl font-bold'>Total Amount: {totalAmount}</p>
                                <p className='text-xl font-bold'>Total Price: ${parseFloat(totalPrice - 1).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            ))}
            </div>
        </div>
    </>
  )
}

export default Payment