import React from 'react'
import Message from '../msg/Message'
import SingleChatNav from './SingleChatNav'

function SingleChat() {

  return (
    <div className='flex flex-col w-full relative'>
      <SingleChatNav />
      <div className="bg-chat bg-cover bg-no-repeat h-[90vh] w-full">
      <Message/>
        <div className="absolute bottom-4 flex bg-white w-[90%] rounded-2xl items-center  px-5 mx-10">
          <img src="/images/Vector (26).svg" alt="" />
          <input type="text" className='w-full py-6 outline-none mx-5' placeholder='Type message here...' />
          <button>

          </button>
          <input type="file" className='hidden' id="file" />
          <label htmlFor='file'  className='cursor-pointer'>
            <img src="/images/Vector (27).svg" alt=""  />
          </label>
           <button className='mx-3 ml-6'> <img src="/images/Vector (28).svg" alt="" /></button>
        </div>
      </div>
    </div>
  )
}

export default SingleChat