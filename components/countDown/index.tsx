import { useContract, useContractRead } from '@thirdweb-dev/react';
import { type } from 'os';
import React from 'react'
import Countdown from 'react-countdown';
import { contractAddress } from '../../constants'

  type  CountDownTimerProps = {
    hours?: number;
    minutes?: number;
    seconds?: number;
    completed?: boolean;
  }
    

function CountDownTimer() {
    const { contract } = useContract(contractAddress);
    const { data : expiration , isLoading : isLoadingExpiration } = useContractRead(contract, "expiration")
    console.log(expiration)
    const renderer = ({ hours, minutes, seconds, completed }: CountDownTimerProps) => {
      if (completed) {
        return (
          <div>
            <h2 className="text-xl text-white text-center animate-bounce">
              Ticket Sale have now Closed for this draw;
            </h2>
          </div>
        )
      }else {
       return (
        <div>
        <h2 className="text-sm text-white italic mb-2">
           Time Remaining 
        </h2>
        <div className="flex space-x-6">
          <div className="flex-1">
            <div className='countdown animate-pulse'>
              {hours} 
            </div>
            <div className="countdown-label">
              hours
            </div>
          
          </div>
          <div className="flex-1">
           <div className='countdown animate-pulse'>
              {minutes}
            </div>
            <div className="countdown-label">
              minutes
            </div>
          
          </div> 
          <div className="flex-1">
          <div className='countdown animate-pulse'>
              {seconds}
            </div>
            <div className="countdown-label">
              seconds
            </div>
          
          </div>

        </div>
      </div>
       )
      }
    };
    
  return (
    <div>
      <Countdown date={new Date(expiration * 1000)} renderer={renderer} />
    </div>
  )
}


export default CountDownTimer;