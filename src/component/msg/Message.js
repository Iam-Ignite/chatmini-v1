import React from 'react'

function Message() {
  return (
    <div className='grid gap-6 justify-end px-6 m-5'>
     <div className="flex justify-end flex-col items-end">
     <div className="bg-white rounded-b-3xl rounded-l-3xl h-auto  p-4">hello world</div>
     <span className='text-xs mt-1 pr-2'>just now</span>
     </div>
    </div>
  )
}

export default Message