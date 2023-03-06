import React from 'react';
import {Spinner} from 'reactstrap';

export default function Loader() {
  return (
    <div className="flex justify-center items-center flex-col my-16"> 
      <Spinner
    color="primary"
    style={{
      height: '5rem',
      width: '5rem'
    }}
    type="grow"
  ></Spinner>
        <h1 className="p-4 font-extrabold text-2xl">Loading, please wait....</h1>
    </div>
  )
}
