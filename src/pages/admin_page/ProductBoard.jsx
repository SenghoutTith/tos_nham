import { AiOutlineClose } from "react-icons/ai"; 
import React, { useState, useEffect } from 'react';
import { useGetProfileQuery } from '../../redux/features/userApiSlice'
import { useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } from "../../redux/features/productApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ProductBoard = () => {

    const [ createProductApiCall, { isLoading: createLoading } ] = useCreateProductMutation()
    const { data, isLoading, refetch } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });
    const [openCreate, setOpenCreate] = useState(false)
    
    const initialState = {
      name: '',
      price: '',
      image: '',
      brand: data?.brand || '',
      category: '',
      description: ''
    }
    const [formData, setFormData] = useState(initialState)

    const handleCreateChange = (e) => {
      //check if the input is number
      if (e.target.name === 'price') {
        if (isNaN(e.target.value)) {
          return
      }}
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }

    const handleCreateSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await createProductApiCall({...formData}).unwrap()
        refetch()
        toast.success("Product added successfully")
        setOpenCreate(false)
        setFormData(initialState)
      } catch (error) {
        toast.error(error?.data?.error || error.message)  
      }
    }
  
    const [ updateProductApiCall, { isLoading: updateLoading } ] = useUpdateProductMutation({}, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true})
    const [open, setOpen] = useState(false)
    const [updateProduct, setupdateProduct] = useState({});
    const product = data?.product.products
    const handleupdateProduct = (product) => {
      setOpen(true);
      setupdateProduct((prevUpdateProduct) => ({ ...prevUpdateProduct, ...product }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await updateProductApiCall(updateProduct).unwrap()
        refetch()
        toast.success("Product updated successfully");
        setupdateProduct({});
        setOpen(false);
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
    const handleChange = (e) => {
      e.preventDefault()
      //check if the input is number
      if (e.target.name === 'price') {
        if (isNaN(e.target.value)) {
          return
      }}
      const { name, value } = e.target;
      setupdateProduct((prevUpdateProduct) => ({ ...prevUpdateProduct, [name]: value }));
    };

    const [ deleteProductApiCall, { isLoading: deleteLoading } ] = useDeleteProductMutation()

    const handleDelete = async (id) => {
      try {
        const res = await deleteProductApiCall(id).unwrap()
        refetch()
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
    
  return (
    <>

      {isLoading || updateLoading || createLoading || deleteLoading &&  <Loader />}
    
      <div className={`relative w-[77%] h-screen overflow-x-auto shadow-md sm:rounded-lg mt-[7rem] ml-[17rem] `}>
        <div className="h-20 flex justify-between p-5 align-middle">
          <h1 className="flex text-lg font-bold">Products Lists</h1>
          <button onClick={() => setOpenCreate(!openCreate)} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
            + New Products
          </button>
          <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={open ? `overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`  : `hidden overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update product</h3>
                  <button onClick={() => setOpen(!open)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal"  >
                    <AiOutlineClose size={28}/>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name
                      </label>
                      <input type="text" value={updateProduct.name} onChange={handleChange} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input type="text" value={updateProduct.price} onChange={handleChange} name="price" id="price"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="category"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category
                      </label>
                      <select name='category' value={updateProduct.category} onChange={handleChange} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value='pizza'>pizza</option>
                        <option value='drink'>drink</option>
                        <option value='noodle'>noodle</option>
                        <option value='hamburger'>hamburger</option>
                      </select>
                    </div>

                    {/* add description */}
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <input type="text" value={updateProduct.description} onChange={handleChange} name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                      <input type="text" value={updateProduct.image} onChange={handleChange} name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  />
                    </div>
                  </div>
                  <button type="submit" className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  >
                    Update product
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={openCreate ? `overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`  : `hidden overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Product</h3>
                  <button onClick={() => setOpenCreate(!openCreate)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal"  >
                    <AiOutlineClose size={28}/>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={handleCreateSubmit}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" onChange={handleCreateChange} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input type="text" onChange={handleCreateChange} name="price" id="price"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category
                      </label>
                      <select name='category' onChange={handleCreateChange} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option>...</option>
                        <option value='pizza'>pizza</option>
                        <option value='drink'>drink</option>
                        <option value='noodle'>noodle</option>
                        <option value='hamburger'>hamburger</option>
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <input type="text" onChange={handleCreateChange} name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                      <input disabled placeholder={data?.brand} type="text" name="brand" id="brand" className="bg-gray-300 border border-gray-600 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                      <input type="text" onChange={handleCreateChange} name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  />
                    </div>
                  </div>
                  <button type="submit" className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  >
                    Create now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                Images
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          
          <tbody>
            {product.map((product) => (
              <tr key={product._id} className="relative odd:bg-white h-1 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className=" w-7  font-medium  whitespace-nowrap dark:text-white">
                  <img src={product.image} alt="" className='  object-cover' />
                </th>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4 flex">
                  <button onClick={() => handleupdateProduct(product)} className="block text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-9 py-2.5 text-center mr-3" type="button">
                    update
                  </button>

                  <button onClick={() => handleDelete(product._id) } className="block text-white bg-red-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductBoard;