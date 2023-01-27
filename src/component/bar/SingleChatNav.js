import React, { useContext } from 'react'
import { ChatContext } from '../../context/chatContext';


function SingleChatNav() {
const { data } = useContext(ChatContext);
// console.log(data.user);
  return (
     <div className='md:relative fixed w-full border-l bg-[#DCF5FE]'  >
        <div className="flex justify-between items-center px-6 py-3 border-b">
            <div className="flex justify-between f items-center">
                <img src={data.user.photoURL} className='h-14 rounded-full mr-4' alt="" />
                <div className="flex flex-col">
                    <b>{data.user.displayName}</b>
                <span className='text-gray-700 text-xs'></span>
                </div>
            </div>
            <div className="flex justify-between w-44 mr-5">
              
               <img src="/images/Vector (25).svg" className='h-5' alt="icon" />
               <img src="/images/Vector (24).svg" className='h-5' alt="icon" />
               <img src="/images/Vector (23).svg" className='h-5' alt="icon" />
            </div>
        </div>
        </div>
  )
}

export default SingleChatNav