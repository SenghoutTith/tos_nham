import { AiOutlineCloudUpload } from "react-icons/ai"; 
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { toast } from 'react-toastify';
import { setCredentials } from "../../../redux/features/auth/AuthSlice";
import { useUpdateMutation, useUpdatePhotoMutation } from "../../../redux/features/auth/userApiSlice";

const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME
const upload_preset = import.meta.env.VITE_UPLOAD_CLOUDINARY_PRESET

const Profile = () => {

    const dispatch = useDispatch()

    const [updateLoadig, setUpdateLoading] = useState(false)

    const [ updateApiCall, { isLoading } ] = useUpdateMutation()

    const [ updatePhotoApiCall ] = useUpdatePhotoMutation()

    const { userInfo } = useSelector(state => state.auth)

    console.log(userInfo.role);

    const [formData, setFormData] = useState({})

    const [photoImage, setPhotoImage] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)
    

    const handlePhotoChange = (e) => {
        setPhotoImage(e.target.files[0])
        setPhotoPreview(URL.createObjectURL(e.target.files[0]))
    }

    const updatePhoto = async (e) => {
        e.preventDefault()
        setUpdateLoading(true)
        let imageUrl
        try {
            if(photoImage !== null && (photoImage.type === 'image/jpeg' || photoImage.type === 'image/png')){
                const image = new FormData()
                image.append('file', photoImage)
                image.append('upload_preset', upload_preset)
                image.append('cloud_name', cloud_name)
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                    method: 'POST',
                    body: image
                })
                const imgData = await response.json()
                imageUrl = imgData.url.toString()
            
                const updatedData = {
                    ...formData,
                    photo: imageUrl,
                };
                const res = await updatePhotoApiCall(updatedData).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("Photo updated successfully")
                setUpdateLoading(false)
                setPhotoPreview(null)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const updateUser = async (e) => {
        try {
            e.preventDefault();
            const res = await updateApiCall(formData).unwrap()
            dispatch(setCredentials({...res}))
            toast.success("Update Successfully")
         } catch (error) {
             toast.error(error?.data?.message || error.message);
         }
     }

    useEffect(() => {
        if(userInfo){
            setFormData({
                name: userInfo?.name || "",
                photo: userInfo?.photo || "",
                email: userInfo?.email || "",
                phonenumber: userInfo?.phonenumber || "",
                street: userInfo?.street || "",
                city: userInfo?.city || "",
            })
        }
    },[userInfo])

  return (
    <>
    {isLoading && <Loader />}
    <div className='w-full max-h-screen'>
        {/* banner section */}
       <div className='relative w-full h-[300px] bg-gradient-to-r from-purple-950 via-purple-500 to-gray-700' >
            <div className='bg-black/50 w-full h-full absolute top-0 left-0'></div>
        </div>

        {/* body section */}
        <div className='relative h-[600px] w-full bg-gradient-to-b from-purple-50 to bg-purple-100'>
            <div className='absolute -translate-x-1/2 -translate-y-1/2 top-48 left-1/2 '>
                <div className='grid grid-cols-3 gap-5 text-white mb-8'>
                    <Link to="/userInfo/profile" className='hover:scale-105 duration-200 ease-in bg-gray-500/50 drop-shadow-lg shadow-lg px-3 py-2 text-center'>
                        Profile
                    </Link>
                    <Link to="/userInfo/wallet" className='hover:scale-105 duration-200 ease-in bg-gray-500/50 drop-shadow-lg shadow-lg px-3 py-2 text-center'>
                        Wallet
                    </Link>
                    <Link to="/userInfo/wishlist" className='hover:scale-105 duration-200 ease-in bg-gray-500/50 drop-shadow-lg shadow-lg px-3 py-2 text-center'>
                        WishList
                    </Link>
                </div>
                <div className='flex flex-col w-full items-center gap-5 text-gray-600'>
                        
                    {!isLoading && (
                    <>
                        <div className='relative w-full flex items-center justify-center'>
                            <div className='w-32 h-32 rounded-full border-white bg-gray-400 border drop-shadow-lg shadow-md overflow-hidden'>
                                <img src={photoPreview === null ? userInfo?.photo : photoPreview} alt="photo"/>
                            </div>
                            <button disabled={updateLoadig} onClick={updatePhoto} className="absolute top-14 -right-2 flex items-center gap-2 text-white p-2 rounded-lg bg-blue-500"><AiOutlineCloudUpload />{updateLoadig ? "Loading..." : "Upload Photo"}</button>
                        </div>
                        <form onSubmit={updateUser} className='flex flex-col gap-4 border border-gray-400 p-2 shadow-xl'>
                            <p className='text-center'>Role: <span>{userInfo.role}</span></p>

                            <div className='flex flex-col'>
                                <label htmlFor="photoImage" className='text-xs font-bold'>Change photo only<span className="text-red-500">*(jpeg, png) </span>:</label>
                                <input onChange={handlePhotoChange} type="file" name="photoImage" id="photoImage" accept='image/*' className='border border-gray-400 p-2'/>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="name" className='text-xs font-bold'>Username:</label>
                                <input onChange={handleSubmit} value={formData?.name} type="text" name="name" id="name" className='border border-gray-400 bg-white/50 p-2'/>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="email" className='text-xs font-bold'>Email:</label>
                                <input value={formData?.email} disabled type="email" name="email" id="email" className='border border-gray-400 bg-white/50 p-2'/>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="phonenumber" className='text-xs font-bold'>Phone number:</label>
                                <input onChange={handleSubmit} value={formData?.phonenumber} type="number" name="phonenumber" id="phonenumber" className='border border-gray-400 bg-white/50 p-2'/>
                            </div>

                            <div className='grid grid-cols-2'>
                                <div className='flex flex-col'>
                                    <label htmlFor="street" className='text-xs font-bold'>Street</label>
                                    <input onChange={handleSubmit} value={formData?.street} type="text" name="street" autoComplete='on' id="street" className='text-black border border-gray-400 bg-white/50 p-2'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="city" className='text-xs font-bold'>City</label>
                                    <input onChange={handleSubmit} value={formData?.city} type="text" name="city" autoComplete='on' id="city" className='text-black border border-gray-400 bg-white/50 p-2'/>
                                </div>
                            </div>

                            <button type="submit" className='hover:bg-blue-500/75 bg-blue-500 text-white py-2'>Update</button>
                        </form>
                    </>
                    )}
                </div>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Profile