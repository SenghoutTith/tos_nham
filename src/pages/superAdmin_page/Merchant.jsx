import React, { useState } from 'react'
import { useAddBrandMutation, useGetAllUsersQuery, useUpdateRoleMutation } from '../../redux/features/userApiSlice'
import { convertToCambodiaTime, shortenText } from '../../utils/utils';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const Merchant = () => {

  const { data, isLoading, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: 0 })

    const [ updateRole ] = useUpdateRoleMutation()

    const [ addBrand ] = useAddBrandMutation()

    const handleUpdateRole = async (userId, role) => {
        try {
            const res = await updateRole({_id: userId, role: role}).unwrap()
            refetch()
            toast.success(res?.message)
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const [newBrand, setNewBrand] = useState({
        userId: '',
        brand: ''
    })

    const handleAddBrand = (userId, brand) => {
        setNewBrand({...newBrand, userId, brand})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addBrand({_id: newBrand.userId, brand: newBrand.brand}).unwrap()
            refetch()
            setNewBrand({...newBrand, brand: ''})
            toast.success(res?.message)
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const legnth = data?.filter(({role}) => role === 'admin').length

  return (
    <>
        {isLoading && <Loader/>}
        <div className={`w-[77%] ${legnth >= 4 ? 'h-full' : 'h-screen'}  shadow-md sm:rounded-lg mt-[5rem] ml-[17rem] text-black`}>
            <p className='text-3xl font-bold'>Merchant:</p>
            <div className='p-5'>
                <div className='grid grid-cols-4 w-full text-center'>
                    <p className='bg-white py-5'>Image</p>
                    <p className='bg-white py-5'>Name</p>
                    <p className='bg-white py-5'>Role</p>
                    <p className='bg-white py-5'>Information</p>
                </div>
                {data?.filter(({role}) => role === 'admin').slice().reverse().map(({photo, name, email, role, _id: userId, brand, street, city, phonenumber, createdAt}, index) => (
                    <div key={index} className='grid grid-cols-4 w-full h-full border border-black'>
                        <div className='flex items-center justify-center w-full h-full border-r-2 p-2'>
                            <img src={photo} className='rounded-full h-[100px] w-[100px] object-cover' alt='profile'/>
                        </div>
                        <div className='border-r-2 p-2 w-full h-full flex flex-col justify-between'>
                            <div>
                                <p>{name}</p>
                                <p className='text-xs'>#{userId}</p>
                                {(role === 'admin' || role === 'superadmin') && <p className='text-xs font-bold'>Company:{brand}</p>}
                            </div>

                            { role === 'admin' &&
                            <form onSubmit={handleSubmit}>
                                <div className='text-white'>
                                    <input className='px-2 py-1 rounded-md w-full bg-slate-500' type="text" name="brand" value={brand} placeholder='add a company name' onChange={(e) => handleAddBrand(userId, e.target.value)}/>
                                </div>
                            </form>}

                        </div>
                        <div className='border-r-2 p-2 w-full h-full flex flex-col justify-between'>
                            <p>{role}</p>
                            {role === 'superadmin' ? <div className='bg-gray-500 rounded-md text-xl'>
                                <p className='w-full py-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-100 to-purple-400 animate-pulse text-center font-bold'>Super Admin</p>
                            </div>
                                : <select name="role" value={role} onChange={(e) => handleUpdateRole(userId, e.target.value)} className="bg-green-500 py-2 text-white rounded-md outline-none">
                                <option value="customer">Customer</option>
                                <option value="admin">Merchant</option>
                                <option value="deliveryman">DeliveryMan</option>
                            </select>}
                        </div>

                        <div className='border-r-2 p-2 w-full h-full flex flex-col justify-evenly text-xs'>
                            <p>{shortenText(email, 30)}</p>
                            <p>{street}, {city}</p>
                            <p>{phonenumber}</p>
                            <p>{convertToCambodiaTime(createdAt)}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Merchant