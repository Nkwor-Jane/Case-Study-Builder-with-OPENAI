import React from 'react';
import { Link } from 'react-router-dom';
import BACK from '../assets/back_home.png'

export default function ErrorPage() {
  return (
    <div className="app flex justify-center items-center w-full flex-col h-full mt-20">
      <img src={BACK} alt="GO BACK" className='h-52 w-72'/>
        <h3 className='p-4 font-extrabold text-xl'>
            You've not provided sufficient details. Kindly go back to{" "}
            <Link to ='/' className='text-blue-600'>homepage</Link>
        </h3>
    </div>
  )
}