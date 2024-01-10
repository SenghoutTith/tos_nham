import React from 'react'
import ReactDOM  from 'react-dom'
import loader from '../assets/loader.gif'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='bg-black/70 fixed w-[100vw] h-screen z-10 top-0'>
        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
            <img src={loader} alt="loading..."  className='w-14 grayscale-0 brightness-50 contrast-100 drop-shadow-lg'/>
        </div>
    </div>,
    document.getElementById('loader')
  );
};

export default Loader