import { AiOutlineCaretRight } from "react-icons/ai"; 
import React, { useState } from 'react'
import { useGetAllUsersQuery, useGetProfileQuery, useTransferPaymentToDeliveryManMutation, useUpdatePaymentStatusMutation } from '../../redux/features/userApiSlice'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify';
import { convertToCambodiaTime, shortenText } from '../../utils/utils';

const Inbox = () => {

    const { data, isLoading } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true })

    const { data: deliveryManData, isLoading: deliveryManLoading } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true })

    const [updatePaymentStatus, { isLoading: statusLoading }] = useUpdatePaymentStatusMutation();

    const handleStatusChange = async (_id, event) => {
        const newStatus = event.target.value;
        try {
            const res = await updatePaymentStatus({_id, status: newStatus});
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error?.data?.message || error?.message);
        }
    };

    const [ freakId, setFreakId ] = useState('')

    const [pickedOrders, setPickedOrders] = useState([]);

    const [ transferToDeliveryMan, { isLoading: transferLoading }] = useTransferPaymentToDeliveryManMutation();

    const handlePickDelivery = async (freakId, deliveryManId) => {
        try {
            const res = await transferToDeliveryMan({freakId, deliveryManId});
            setPickedOrders(prev => [...prev, freakId]);
            toast.success(res.data.message);
            document.getElementById('my_modal_4').close();
        } catch (error) {
            toast.error(error?.data?.message || error?.message);
        }
    };

  return (
    <>
        { isLoading || statusLoading || deliveryManLoading || transferLoading && <Loader /> }
        <div className={`w-[77%] ${data?.orders.length <= 1 ? 'h-screen' : 'h-full'} shadow-md sm:rounded-lg mt-[5rem] ml-[17rem] text-black`}>
            <h1 className="flex text-lg font-bold p-5">New Order:</h1>
            <div className='flex flex-col gap-7 p-5 justify-center items-center'>
                {data?.orders.slice().reverse().map(({data: {product = [], user = [], paymentOption, _id: orderId, createdAt, status, totalAmount, totalPrice}}, index) => (
                    <div key={index} className={`${status === 'success' && 'opacity-50'} flex flex-col bg-gray-500 rounded-md overflow-hidden w-[80%] h-[80%] shadow-md shadow-black`}>
                        <div className='flex justify-between items-center bg-gray-300 p-3'>
                            <p className='w-full'>Order Id: {orderId}</p>
                            <select disabled={status === 'success'} value={status} onChange={(e) => handleStatusChange(orderId, e)} className={`p-2 rounded-md status-select ${status} ${status === 'success' && 'cursor-not-allowed'}`}>
                                <option value="pending">Pending</option>
                                <option value="cancel">Cancel</option>
                                <option value="accept">Accept</option>                  
                                <option value="success">Success</option>
                            </select>
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
                                <button  
                                    disabled={status === 'success'} 
                                    onClick={()=>{document.getElementById('my_modal_4').showModal(), setFreakId(orderId)}}
                                    className={`bg-black/90 flex gap-2 items-center p-3 text-gray-400 font-bold text-[13px] text-shadow rounded-lg ${status === 'success' && 'cursor-not-allowed'}`}
                                    type="button"> 
                                        Find delivery <AiOutlineCaretRight className="bounce-x mr-2"/>
                                </button>
                                <dialog id="my_modal_4" className="modal">
                                    <div className="modal-box w-11/12 max-w-5xl text-white">
                                        <h3 className="font-bold text-lg p-4">Find your delivery man :</h3>
                                        <p className="pb-3">Order Id: {freakId}</p>
                                        <div className='flex flex-col gap-2'>
                                        {deliveryManData?.map((user) => (
                                            user.role === 'deliveryman' && (
                                                <div key={user._id} className="border p-3 rounded-md">
                                                    <p className="font-bold">Delivery Name: <span className="font-light">{user.name}</span></p>
                                                    <p className="font-bold">Phone number: <span className="font-light">{user.phonenumber}</span></p>
                                                    {user.delivery[0]?.workingStatus === 'free' ?
                                                        <div className="flex relative">
                                                            <p className="font-bold">Status: <span className='text-green-500 font-light'>{user.delivery[0]?.workingStatus}</span></p>
                                                            <button onClick={() => handlePickDelivery(orderId, user._id)} className="absolute right-0 bottom-0 p-2 bg-green-500 rounded-md hover:bg-green-500/70 hover:scale-110 duration-200 ease-in-out">Pick Delivery</button>
                                                        </div>
                                                        :
                                                        <div className="flex relative">
                                                            <p className="font-bold">Status: <span className='text-amber-500 font-light'>{user.delivery[0]?.workingStatus}</span></p>
                                                            <button disabled className="absolute right-0 bottom-0 p-2 bg-amber-500 text-gray-700 rounded-md cursor-not-allowed">Pick Delivery</button>
                                                        </div>
                                                    }
                                                    
                                                </div>
                                            )
                                        ))}
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                        
                   </div>
                ))}
            </div>

        </div>
    </>
    
  )
}

export default Inbox