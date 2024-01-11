import React from 'react'
import { useGetAllUsersQuery, useUpdateRoleMutation } from '../../redux/features/userApiSlice'
import { shortenText, convertToCambodiaTime } from '../../utils/utils'
import { toast } from 'react-toastify'

const Customer = () => {

  const { data, isLoading, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: 0 })


    const [ updateRole ] = useUpdateRoleMutation()


    const handleUpdateRole = async (userId, role) => {
        try {
            const res = await updateRole({_id: userId, role: role}).unwrap()
            refetch()
            toast.success(res?.message)
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const legnth = data?.filter(({role}) => role === 'customer').length

  return (
    <>
    {isLoading && <Loader/>}
        <div className={`w-[77%] ${legnth >= 4 ? 'h-full' : 'h-screen'} shadow-md sm:rounded-lg mt-[5rem] ml-[17rem] text-black`}>
            <p className='text-3xl font-bold'>Customer:</p>
            <div className='p-5'>
                <div className='grid grid-cols-4 w-full text-center'>
                    <p className='bg-white py-5'>Image</p>
                    <p className='bg-white py-5'>Name</p>
                    <p className='bg-white py-5'>Role</p>
                    <p className='bg-white py-5'>Information</p>
                </div>
                {data?.filter(({role}) => role === 'customer').slice().reverse().map(({photo, name, email, role, _id: userId, street, city, phonenumber, createdAt}, index) => (
                    <div key={index} className='grid grid-cols-4 w-full h-full border border-black'>
                        <div className='flex items-center justify-center w-full h-full border-r-2 p-2'>
                            <img src={photo} className='rounded-full h-[100px] w-[100px] object-cover' alt='profile'/>
                        </div>
                        <div className='border-r-2 p-2 w-full h-full flex flex-col justify-between'>
                            <div>
                                <p>{name}</p>
                                <p className='text-xs'>#{userId}</p>
                            </div>
                        </div>
                        <div className='border-r-2 p-2 w-full h-full flex flex-col justify-between'>
                            <p>{role}</p>
                            <select name="role" value={role} onChange={(e) => handleUpdateRole(userId, e.target.value)} className='bg-purple-500 py-2 text-white rounded-md outline-none'>
                              <option value="customer">Customer</option>
                              <option value="admin">Merchant</option>
                              <option value="deliveryman">DeliveryMan</option>
                            </select>
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

export default Customer