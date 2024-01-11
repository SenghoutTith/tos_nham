import { BsTrash } from "react-icons/bs"; 
import { AiOutlineClose } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react'
import { useDecreaseCartAmountMutation, useDeleteCartItemMutation, useGetProfileQuery, useIncreaseCartAmountMutation, usePaymentMutation } from '../../redux/features/userApiSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { shortenText } from '../../utils/utils';

const Cart = () => {

  const { data, isLoading, error, refetch } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });

  const isLoggedIn = Boolean(data && !error);

  const [checkOut, setCheckOut] = useState(false)

  //increase cart amount
  const [increaseAmountApiCall, { isLoading: increaseLoading }] = useIncreaseCartAmountMutation({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true})
  const increaseAmount = async (id) => {
    try {
      const res = await increaseAmountApiCall({
        productId: id
      }).unwrap()
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  //decrease cart amount
  const [decreaseAmountApiCall, { isLoading: decreaseLoading }] = useDecreaseCartAmountMutation({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true})
  const decreaseAmount = async (id) => {
    try {
      const res = await decreaseAmountApiCall({
        productId: id
      }).unwrap()
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  //delete cart item
  const [deleteCartItemApiCall, { isLoading: deleteLoading }] = useDeleteCartItemMutation({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true})
  const deleteCartItem = async (id) => {
    try {
      const res = await deleteCartItemApiCall(id).unwrap()
      toast.success(res.message);
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  const [ addPayment ] = usePaymentMutation({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true}) 

  const handleCheckout = () => {
    //if cart is empty checkout button will not work
    if (data?.cart.items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    setCheckOut(!checkOut)
  }

  const [selectedPayment, setSelectedPayment] = useState(''); // Default value, you can change it as needed

  const initialState = {
    cart: [],
    user: {
        name: "",
        phonenumber: "",
        street: "",
        city: "",
    }
  };

  const [orderData, setOrderData] = useState(initialState);

  const handleOrderData = async () => {
    try {
        const brands = data?.cart.items.map((item) => item.brand);
        const uniqueBrands = new Set(brands);
    
        // Check if cart has more than one unique brand
        if (uniqueBrands.size > 1) {
          toast.error('You can only order from one brand at a time');
          return;
        }

        const res = await addPayment({ 
          user: data, 
          product: data?.cart.items, 
          brand: brands[0], 
          paymentOption: selectedPayment 
        });
        toast.success("Order placed successfully");
        setOrderData(initialState)
        setCheckOut(!checkOut)
    } catch (error) {
      console.log(error);
        toast.error(error?.data?.message || error?.message);
    }
  };

  

  return (
    <>
      {isLoading || increaseLoading || decreaseLoading || deleteLoading && <Loader/>}
      {checkOut && <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-[150]'></div>}
      <div className={`${data?.cart.items.length >= 1 ? 'h-full' : 'h-screen'} py-24 md:px-16 px-2 text-black`}>
        <div className="relative">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          {checkOut && (
                <div className='z-[200] p-5 text-white absolute w-full md:w-[70%] left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-full rounded-lg'>
                    <AiOutlineClose onClick={() => setCheckOut(!checkOut)} size={25} className="absolute top-5 right-5"/>
                    <p className='text-xl font-bold py-2 font-serif'>Checkout your cart: </p>
                    <p className='pb-3 text-xs text-amber-500'><span className='text-white font-bold underline-offset-1 underline'>Note:</span> If your information is incorrect, please update it inside your profile*</p>
                    <p>Username: <span className='text-green-500'>{data?.name}</span></p>
                    <p>Phone: <span className='text-green-500'>{data?.phonenumber}</span></p>
                    <p>Location: </p>
                    <p className='pl-5'>Street: <span className='text-green-500'>{data?.street}</span></p>
                    <p className='pl-5'>City: <span className='text-green-500'>{data?.city}</span></p>
                    <p>Cart: </p>
                    <div>
                      <div className='hidden md:grid grid-cols-4 m-1 rounded-md justify-between p-2 bg-gray-500'>
                        <p>Food</p>
                        <p>Company</p>
                        <p>Amount</p>
                        <p>Price</p>
                      </div>
                      {data?.cart.items.map((product) => (
                        <div key={product.productId}>
                            <div className='hidden md:grid md:grid-cols-4 m-1 rounded-md justify-between p-2 bg-gray-500'>
                              <div className="w-[90%] h-full mx-auto">
                                <img className="w-full h-full object-cover" src={product.image} alt="img" />
                              </div>
                              <div className="p-2">
                                <p>{shortenText(product.brand, 20)}</p>
                                <p className="text-xs">{shortenText(product.name, 30)}</p>
                                <p className="text-xs">{shortenText(product.description, 40)}</p>
                              </div>
                              <p>${product.price} x {product.amount}</p>
                              <p>Total: ${parseFloat(product.total).toFixed(2)}</p>
                            </div>
                            <div className="w-full h-full flex md:hidden p-3 bg-gray-600 my-1 gap-2 rounded-md overflow-hidden">
                              <div className="w-1/2 h-[100px]">
                                  <img className="w-full h-full object-cover" src={product.image} alt="img" />
                              </div>
                              <div className="flex flex-col justify-between text-xs gap-1 w-full h-full">
                                <p>{shortenText(product.brand, 20)}</p>
                                <p>{shortenText(product.name, 30)}</p>
                                <p>{shortenText(product.description, 30)}</p>
                                <div className="flex justify-between">
                                  <p>${product.price} x {product.amount}</p>
                                  <p>Total: ${parseFloat(product.total).toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                        </div>
                        
                      ))}
                        <div className='grid grid-cols-4 m-1 rounded-md justify-between p-2 bg-gray-500'>
                          <p>Delivery:</p>
                          <p></p>
                          <p></p>
                          <p>Total: $1</p>
                        </div>
                      <p className="text-start p-2">Total Price: ${parseFloat(data?.cart.totalPrice + 1).toFixed(2)}</p>
                      <p>Payment:</p>
                      <select name="payment" value={selectedPayment} onChange={(e) => {
                        setSelectedPayment(e.target.value)}} className="bg-gray-500 mb-2 rounded-lg p-2">
                        <option >....</option>
                        <option value="cashOnDelivery">cash on delivery</option>
                        <option value="ABA">ABA</option>
                        <option value="Acleda">Acleda</option>
                      </select>
                      <button onClick={handleOrderData} className="mb-5 w-full h-full bg-green-500 hover:bg-green-500/50 py-3" type="button">Place order</button>
                    </div>
              </div>
            )}
        </div>
          
          <div className={`h-full flex flex-col md:flex-row gap-4`}>
            <div className={`h-full w-full flex rounded-lg shadow-md p-2 gap-2 bg-gray-400`}>
                {data?.cart.items.length === 0 ? (
                    <p className='py-5'>Your Cart is Empty...</p>
                  ) : 
                  (
                    <div className={`w-full h-full shadow-md flex flex-col gap-4 relative`}>
                      {data?.cart.items.map((product) => (
                        <div key={product.productId} className="bg-white flex gap-2 md:gap-5 shadow-md p-2">
                          <p className="hidden  text-[13px] md:text-[15px] md:flex items-center font-bold">{shortenText(product.brand, 25)}</p>
                          <div className="h-[120px] w-[120px]">
                            <img className="h-full w-full object-cover" src={product.image} alt="Product image" />
                          </div>
                          <div className="flex flex-col gap-2 justify-evenly w-full h-full ">
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">{shortenText(product.name, 25)}</p>
                              <div
                                className='p-2 bg-red-500 text-white hover:bg-red-500/50 rounded-md cursor-pointer'
                                onClick={() => deleteCartItem(product.productId)}>
                                <BsTrash size={18}/>
                              </div>
                            </div>
                            <p className="text-xs">{shortenText(product.description, 60)}</p>
                            <p>${product.price} ({product.amount})</p>
                            <div className="flex justify-between">
                              <p className="py-2">${parseFloat(product.total).toFixed(2)}</p>
                              <div className="flex items-center">
                                <button 
                                  className="border rounded-md px-3 py-1 bg-amber-500 hover:bg-amber-500/50"
                                  onClick={() => decreaseAmount(product.productId)}>
                                  -
                                </button>
                                <p className="text-center px-2">{product.amount}</p>
                                <button
                                  className="border rounded-md px-3 py-1 bg-green-500 hover:bg-green-500/50"
                                  onClick={() => increaseAmount(product.productId)}>
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                    </div>
                  )}
            </div>
            
            <div className={`h-full w-full md:w-[50%] bg-white rounded-lg shadow-md p-2 md:p-6`}>
              <h2 className="text-xs md:text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span >Subtotal</span>
                <span>${parseFloat(data?.cart.totalPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery</span>
                <span>${data?.cart.items.length > 0 ? "1" : "0"}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${parseFloat((data?.cart.totalPrice || 0) + (data?.cart.items.length > 0 ? 1 : 0)).toFixed(2)}</span>
              </div>
              <button disabled={!isLoggedIn} onClick={handleCheckout} className={`bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full ${!isLoggedIn && 'cursor-not-allowed'}`}>Checkout</button>
            </div>
          </div>

          
      </div> 
    </>
  )
}

export default Cart

// cart skeleton animation

{/* <tbody className="animate-pulse">
{ Array.from({length: 3}, (_, index) => (
<tr key={index} className="absolute">
  <div role="status" className="py-4 space-y-8  md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
    <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
</tr>))}
</tbody> */}