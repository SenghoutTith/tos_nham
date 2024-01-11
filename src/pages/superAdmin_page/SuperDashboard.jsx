import React from 'react'
import { useGetAllUsersQuery, useGetProfileQuery } from '../../redux/features/userApiSlice'
import Loader from '../../components/Loader'

const SuperDashboard = () => {

    const { data ,isLoading} = useGetProfileQuery({}, { refetchOnMountOrArgChange: 0 })

    const { data: userData, isLoading: userDataLoading } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true })

    const filterCustomer = userData?.filter(user => user.role === 'customer')

    const filterMerchant = userData?.filter(user => user.role === 'admin')

    const filterDeliveryMan = userData?.filter(user => user.role === 'deliveryman')

  return (
    <>
        {isLoading || userDataLoading && <Loader/>}
        <div className="p-4 sm:ml-64 pt-[5rem] overflow-hidden">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className=" p-7 h-24 rounded bg-blue-400 dark:bg-gray-800">
                  <h1>Company Name:</h1>
                  <p>{data?.brand}</p>
              </div>
              <div className=" p-7 h-24 rounded bg-violet-400  dark:bg-gray-800" >
                  <h1>Total Customer:</h1>
                  <p>{filterCustomer?.length}</p>
              </div>
              <div className=" p-7 h-24 rounded bg-green-400  dark:bg-gray-800">
                  <h1>Total Merchant:</h1>
                  <p>{filterMerchant?.length}</p>
              </div>
              <div className=" p-7 h-24 rounded bg-yellow-400  dark:bg-gray-800">
                  <h1>Total Delivery:</h1>
                  <p>{filterDeliveryMan?.length}</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p className="text-2xl text-gray-400 dark:text-gray-500">
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                  </p>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default SuperDashboard