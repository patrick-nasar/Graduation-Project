import React, { useState } from 'react'

export default function SelectOpretion({ operation, setOperation }) {
  const [stock, setStock] = useState(false);

  return (
    <>
      <div className='text-center content-center p-2 '>
        <div className=' grid-cols-3 inline-grid gap-6 justify-center items-center py-5 '>
          <div className='flex justify-center items-center w-[21rem] h-[15rem] shadow-md rounded-xl bg-white hover:scale-105 transition duration-500' >
            <button className={` h-full space-y-3 rounded-lg  ${operation === 'stock mangment' ? ' outline-none ring ring-sky-400 animate-wiggle' : ''}`}
              onClick={() => { setOperation('stock mangment'); setStock(true); console.log(operation) }}>
              <div className='px-5 py-2 space-y-5'>
                <h1 className='text-xl'>stock mangment</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt facilis vel delectus laboriosam consequuntur fugiat maxime natus culpa offi</p>
              </div>
            </button>
          </div>

          <div className='flex justify-center items-center w-[21rem] h-[15rem] shadow-md rounded-xl bg-white hover:scale-105 transition duration-500' >
            <button className={` h-full space-y-3 rounded-lg  ${operation === 'stock mangment' ? ' outline-none ring ring-sky-400 animate-wiggle' : ''}`}
              onClick={() => { setOperation('stock mangment'); setStock(true); console.log(operation) }}>
              <div className='px-5 py-2 space-y-5'>
                <h1 className='text-xl'>stock mangment</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt facilis vel delectus laboriosam consequuntur fugiat maxime natus culpa offi</p>
              </div>
            </button>
          </div>

          <div className='flex justify-center items-center w-[21rem] h-[15rem] shadow-md rounded-xl bg-white hover:scale-105 transition duration-500' >
            <button className={` h-full space-y-3 rounded-lg  ${operation === 'predict' ? ' outline-none ring ring-sky-400 animate-wiggle' : ''}`}
              onClick={() => { setOperation('predict'); setStock(true); console.log(operation) }}>
              <div className='px-5 py-2 space-y-5'>
                <h1 className='text-xl'>predict</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt facilis vel delectus laboriosam consequuntur fugiat maxime natus culpa offi</p>
              </div>
            </button>
          </div>


        </div >
      </div >

    </>
  )
}
