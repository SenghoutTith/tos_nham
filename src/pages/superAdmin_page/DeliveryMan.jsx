import React from 'react'
import { useGetAllUsersQuery, useUpdateDeliveryManStatusMutation, useUpdateRoleMutation } from '../../redux/features/userApiSlice'
import { convertToCambodiaTime, shortenText } from '../../utils/utils';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const DeliveryMan = () => {

  const { data, isLoading, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: 0 })

    const [ updateWorkingStatus ] = useUpdateDeliveryManStatusMutation()

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

    const handleUpdateWorkingStatus = async (userId, workingStatus) => {
        try {
            const res = await updateWorkingStatus({_id: userId, workingStatus: workingStatus}).unwrap()
            refetch()
            toast.success(res?.message)
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const legnth = data?.filter(({role}) => role === 'deliveryman').length

  return (
    <>
        {isLoading && <Loader/>}
        <div className={`w-[77%] ${legnth >= 4 ? 'h-full' : 'h-screen'} shadow-md sm:rounded-lg mt-[5rem] ml-[17rem] text-black`}>
            <p className='text-3xl font-bold'>Delivery Man:</p>
            <div className='p-5'>
                <div className='grid grid-cols-4 w-full text-center'>
                    <p className='bg-white py-5'>Image</p>
                    <p className='bg-white py-5'>Name</p>
                    <p className='bg-white py-5'>Role</p>
                    <p className='bg-white py-5'>Information</p>
                </div>
                {data?.filter(({role}) => role === 'deliveryman').slice().reverse().map(({photo, name, email, role, _id: userId, street, city, phonenumber, createdAt, delivery}, index) => (
                    <div key={index} className='grid grid-cols-4 w-full h-full border border-black'>
                        <div className='flex items-center justify-center w-full h-full border-r-2 p-2'>
                            <img src={photo} className='rounded-full h-[100px] w-[100px] object-cover' alt='profile'/>
                        </div>
                        <div className='border-r-2 p-2 w-full h-full flex flex-col justify-between'>
                            <div>
                                <p>{name}</p>
                                <p className='text-xs'>#{userId}</p>
                                <p className='text-xs font-bold'>
                                    workingStatus: {delivery[0]?.workingStatus || "..."}
                                </p>
                            </div>

                            <div>
                                <select name="workingStatus" value={delivery[0]?.workingStatus || "..."} onChange={(e) => handleUpdateWorkingStatus(userId, e.target.value)} className={`p-1 ${delivery[0]?.workingStatus === 'free' ? 'bg-green-500' : 'bg-amber-500'}  text-white rounded-md`}>
                                    <option value="">...</option>
                                    <option value="free">free</option>
                                    <option value="busy">busy</option>
                                </select>
                            </div>

                        </div>
                        <div className='border-r-2 p-2 w-full h-full flex flex-col justify-between'>
                            <p>{role}</p>
                            <select name="role" value={role} onChange={(e) => handleUpdateRole(userId, e.target.value)} className='bg-amber-500 py-2 text-white rounded-md outline-none'>
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

export default DeliveryMan