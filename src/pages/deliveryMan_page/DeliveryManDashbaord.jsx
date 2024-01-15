import React, { useEffect, useState } from 'react'
import { useGetProfileQuery, useUpdateDeliveryManWorkingStatusMutation, useUpdatePaymentStatusByDeliveryManMutation } from '../../redux/features/userApiSlice'
import { convertToCambodiaTime } from '../../utils/utils'
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const DeliveryManDashbaord = () => {

    const { data, isLoading} = useGetProfileQuery({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });

    const [ accept, setAccept ] = useState( false )

    const [isChecked, setIsChecked] = useState(false);

    const [ updateStaus, {isLoading: updateStausLoading} ] = useUpdatePaymentStatusByDeliveryManMutation({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true })

    //update the staus of the order when input type checkbox is checked
    const handleUpdateStatus = async (orderId) => {
        try {
            const res = await updateStaus({ _id: orderId, status: 'success' })
            toast.success(res?.data?.message || res?.message);
        } catch (error) {
            toast.error(error?.data?.message || error?.message);
        }
      };

    const [ updateWorkStatus, {isLoading: updateWorkStatusLoading} ] = useUpdateDeliveryManWorkingStatusMutation({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true })

    const [isFree, setIsFree] = useState(data?.delivery[0].workingStatus === 'free' ? 'free' : 'busy');

    const handleUpdateWorkStatus = async () => {
        try {
            const newStatus = isFree === 'free' ? 'busy' : 'free';
            setIsFree(newStatus);
            const res = await updateWorkStatus({ workingStatus: newStatus })
            toast.success(res?.data?.message || res?.message);
        } catch (error) {
            toast.error(error?.data?.message || error?.message);
        }
    }

    
    useEffect(() => {
        setIsFree(data?.delivery[0].workingStatus)
    }, [data?.delivery[0].workingStatus, isFree])

  return (
    <>
        {/* make a cool layout dashboard for deliveryman, i want to have status, and able to change it from free or busy, and the food order product */}
        {isLoading || updateStausLoading || updateWorkStatusLoading && <Loader/>}
        <div className='p-20 h-full'>
            <div className='p-5'>
                {/* dashbaord */}
                <div className='grid grid-cols-3 shadow-lg'>
                    <div className='p-5 bg-green-500 text-white shadow-inner'>
                        <p className='text-xl font-bold'>Delivery Rate:</p>
                        <p>$1</p>
                    </div>
                    <div className='p-5 bg-blue-500 text-white shadow-inner'>
                        <p className='text-xl font-bold'>Total Deliverd:</p>
                        <p>{data?.delivery[0].totalDelivered}</p>
                    </div>
                    <div className='p-5 bg-amber-500 text-white shadow-inner'>
                        <p className='text-xl font-bold'>Total Earned:</p>
                        <p>${data?.delivery[0].totalEarned}</p>
                    </div>
                </div>
                {/* user info */}
                <div className='py-5 text-3xl'>
                    <p className='font-bold'>Hi,</p>
                    <p className='text-black font-bold'>{data?.name} !</p>
                </div>
                <div className='py-5'>
                    <p className='font-bold text-black text-3xl'>Your Status:</p>
                    <p>working: <span className={`${isFree === 'free' ? 'text-green-500' : 'text-amber-500'}`}>{isFree}</span></p>
                    <input
                        checked={isFree === 'free'}
                        type="checkbox" 
                        className="toggle toggle-success"
                        onChange={handleUpdateWorkStatus}
                    />
                </div>
                {/* order notification*/}
                <div className='grid grid-cols-1 w-full h-full gap-2 place-items-center'>
                    {data?.delivery.slice(1).reverse().map(({data}, index) => (
                        <div key={index} className='w-1/2 h-full relative'>
                            <div className={`p-5 bg-white shadow-lg ${data.status === 'success' ? 'opacity-60' : 'opacity-100'}`}>
                                <p className='font-bold text-gray-600'>Company: <span className='text-gray-400/90 font-light'>{data.brand}</span></p>
                                <p className='font-bold text-gray-600'>Order ID: <span className='text-gray-400/90 font-light'>#{data?._id}</span> </p>
                                <p className='font-bold text-gray-600'>Customer:</p>
                                <div className='pl-5 text-gray-400/90 font-light'>
                                    {data && data.user && data.user.map(({name, phonenumber, street, city }, userId) => (
                                        <div key={userId}>
                                            <p>- {name}</p>
                                            <p>- Location: <span>{street}, {city}</span></p>
                                            <p>- Phone: <span>{phonenumber}</span></p>
                                            <p>- Time: <span>{convertToCambodiaTime(data.createdAt)}</span></p>
                                            <p>- Payment Option: {data.paymentOption}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className='font-bold text-gray-600'>Order Items:</p>
                                    {data && data.product && data.product.map(({paymentOption, amount, name, total }, productId) => (
                                        <div key={productId} className='pl-5 text-gray-400/90 font-light'>
                                            <p>- <span className='text-black'>x{amount}</span> {name} <span className='text-red-500'>({total}$)</span></p>
                                        </div>
                                    ))}
                                <p className='font-bold text-gray-600'>Order Total: <span>${parseFloat(data.totalPrice).toFixed(2)}</span></p>
                                <div className={`w-full h-full flex gap-5`}>
                                    <button onClick={() => setAccept(true)} className={`${accept || data.status === 'success' ? 'w-full' : 'w-1/2'} duration-300 ease-in p-2 bg-green-500 hover:bg-green-500/50 ${accept && 'bg-green-600/70 hover:bg-green-600/70'} text-shadow text-white`} type='button' disabled={accept}><p className={`${accept && 'animate-pulse font-bold'}`}>Accept</p></button>
                                    <button className={`${accept || data.status === 'success' ? 'hidden cursor-not-allowed' : 'w-1/2'} duration-300 ease-out  p-2 bg-red-500 hover:bg-red-500/50 text-shadow text-white`} disabled={accept} type='button'>Reject</button>
                                </div>   
                            </div>
                            <div className={`${accept || data.status === 'success' ? 'opacity-100 top-5' : 'opacity-0 top-0'} duration-300 ease-in absolute right-5 z-10 w-[140px]`}>
                                <p className='font-bold text-gray-600'>Select status:</p>
                                <div className="form-control my-2">
                                    <label className="cursor-pointer flex items-center gap-2">
                                        <input 
                                        checked={isChecked || data.status === 'success'}
                                        onChange={() => setIsChecked(!isChecked)}
                                        disabled={isChecked || data.status === 'success'}
                                        onClick={() => handleUpdateStatus(data?._id)} 
                                        type="checkbox" 
                                        className="checkbox checkbox-success" />
                                        <span className={`text-xl hover:text-black hover:font-bold duration-200 ${isChecked || data.status === 'success' && 'font-bold text-green-500 hover:text-green-500 cursor-not-allowed'}`}>Deliverd</span>
                                    </label>
                                </div>
                                <p className='text-xs text-amber-500 shadow-md p-2'>{isChecked || data.status === 'success' ? 'completed!' : '*Please check the box, when arrive to your destination'}</p>
                            </div>
                        </div>    
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default DeliveryManDashbaord