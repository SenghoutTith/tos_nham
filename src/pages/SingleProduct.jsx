import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../redux/features/auth/productApiSlice'
import Loader from '../components/Loader'

const SingleProduct = () => {

    const {id} = useParams()

    const { isLoading, isError, isSuccess, data, error} = useGetProductByIdQuery(id)

    console.log(data);

  return (
      <>
        {isLoading && <Loader />}
        <div className='h-screen w-full'>
            <p className='text-3xl tracking-widest pt-20 '>SingleProduct:</p>
            <div className='grid md:grid-cols-2 grid-cols-1 px-5'>
                <div className='place-self-center'>
                    <p className='font-bold text-xl'>product id: <span className='text-base'>{id}</span></p>
                    <p className='font-bold text-xl'>name: <span className='text-base'>{data?.name}</span></p>
                    <p className='font-bold text-xl'>price: <span className='text-base'>{data?.price}</span></p>
            
                    <p className='font-bold text-xl'>brand: <span className='text-base'>{data?.brand}</span></p>
                    <p className='font-bold text-xl'>category: <span className='text-base'>{data?.category}</span></p>
                    <p className='font-bold text-xl'>description: <span className='text-base'>{data?.description}</span></p>
                </div>
                <div className='place-self-center shadow-xl p-5 rounded-sm'>
                    <img className='min-h-[200px] h-[300px] drop-shadow-lg object-cover' src={data?.image} alt='img' />
                </div>
            </div>
        </div>
    </>
    
  )
}

export default SingleProduct