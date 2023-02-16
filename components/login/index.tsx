import React from 'react'
import { useMetamask } from '@thirdweb-dev/react'

function Login() {
    const connectWithMetamask = useMetamask();
  return (
    <div className="flex min-h-screen flex-col px-2 py-2 bg-[#091818] items-center justify-center">
        <div className='flex items-center space-x-2 items-center justify-center mb-10'>
                <img 
                className="rounded-full h-24 w-24"
                src="https://i.imgur.com/4h7mAu7.png" 
                alt="" />
        </div>
        <h1 className="text-4xl font-bold text-white">
            Lottery App 
        </h1>
        <h2 className="text-3xl font-bold text-white">
            Login to use the app
        </h2>
        <button className="bg-[#036756] hover:bg-[#036756] text-white px-4 py-2 rounded mt-10" onClick={connectWithMetamask}>
            Login with Metamask
        </button>
    </div>
  )
}

export default Login