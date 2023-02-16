import React from 'react'
import { PropagateLoader } from 'react-spinners'

function Loading() {
  return (
<div className="flex min-h-screen flex-col px-2 py-2 bg-[#091818] items-center justify-center">
        <div className='flex items-center space-x-2 items-center justify-center mb-10'>
                <img 
                className="rounded-full h-24 w-24"
                src="https://i.imgur.com/4h7mAu7.png" 
                alt="" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">
            Lottery App 
        </h1>
        <PropagateLoader color='white' size={30} />
    </div>
  )
}

export default Loading