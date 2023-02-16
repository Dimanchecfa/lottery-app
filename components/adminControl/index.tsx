import React from 'react'
import { ArrowPathIcon, ArrowUturnDownIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/solid'
import { useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { toast } from 'react-hot-toast'

const AdminControls = ({contract} : any) => {

  const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll")
  const { mutateAsync: restartDraw } = useContractWrite(contract, "restartDraw")
  const { mutateAsync: DrawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket")
  const { mutateAsync: WithdrawCommission } = useContractWrite(contract, "WithdrawCommission")
  const { data : totalCommission} = useContractRead(contract, "operatorTOtalCommission")

  const handleRefundAll = async() => {
    const notification = toast.loading("Processing...")
    try {
      const data = await RefundAll([{}])
      toast.success('Success', { id: notification })
    } catch (error) {
      toast.error('Error', { id: notification })
    }
  }

  const handleRestart = async() => {
    const notification = toast.loading("Processing...")
    try {
      const data = await restartDraw([{}])
      toast.success('Success', { id: notification })
    } catch (error) {
      toast.error('Error', { id: notification })
    }
  }

  const handleDrawWinner = async() => {
    const notification = toast.loading("Processing...")
    try {
      const data = await DrawWinnerTicket([{}])
      toast.success('Success', { id: notification })
    } catch (error) {
      toast.error('Error', { id: notification })
    }
  }

  const handleWithdrawCommission = async() => {
    const notification = toast.loading("Processing...")
    try {
      const data = await WithdrawCommission([{}])
      toast.success('Success', { id: notification })
    } catch (error) {
      toast.error('Error', { id: notification })
    }
  }




  return (  
    <div className='text-center text-white px-10 py-3 rounded-md border border-emerald-300/20'>
      <h2 className='font-bold'>
        Admin Controls</h2>
      <p className='text-sm mb-5'>
        Total Commission to be withdrawn: {contract?.totalCommission?.toString()}
      </p>
      <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
        <button className='admin-button' onClick={handleDrawWinner}>
          <StarIcon className="h-6 mx-auto mb-2"  />
          Draw winner
        </button>
        <button className='admin-button' onClick={handleWithdrawCommission}>
            <CurrencyDollarIcon className="h-6 mx-auto mb-2"  />
            Withdraw commission
        </button>
        <button className='admin-button' onClick={handleRestart}>
            <ArrowPathIcon className="h-6 mx-auto mb-2"  />
            Restart
        </button>
        <button className='admin-button' onClick={handleRefundAll}>
            <ArrowUturnDownIcon className="h-6 mx-auto mb-2"  />
            Refund all
        </button>
      </div>
    </div>
  )
}

export default AdminControls
