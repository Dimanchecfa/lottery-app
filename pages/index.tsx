import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useConnect,
} from '@thirdweb-dev/react'
import Login from '../components/login'
import Loading from '../components/loading'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractAddress, currency } from '../constants'
import CountDownTimer from '../components/countDown'
import { toast } from 'react-hot-toast'
import Marquee from 'react-fast-marquee'
import AdminControls from '../components/adminControl'

const Home: NextPage = () => {
  const address = useAddress()
  const [quantity, setQuantity] = useState<number>(1)
  const [userTickets, setUserTickets] = useState<number>(0)
  const { contract, isLoading } = useContract(contractAddress)
  const { data : RemainingTickets } = useContractRead(contract, "RemainingTickets")
  const { data : CurrentWinningReward } = useContractRead(contract, "CurrentWinningReward")
  const { data : ticketPrice } = useContractRead(contract, "ticketPrice")
  const { data : ticketCommission } = useContractRead(contract, "ticketCommission")
  const { data : expiration} = useContractRead(contract, "expiration")
  const { data : tickets} = useContractRead(contract, "getTickets")
  const { data : winnings} = useContractRead(contract, "getWinningsForAddress" , address)
  const { data : lastWinner} = useContractRead(contract, "lastWinner")
  const { data : lastWinnerAmount} = useContractRead(contract, "lastWinnerAmount")
  const { data  : isLotteryOperator} = useContractRead(contract, "lotteryOperator")
  const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, "WithdrawWinnings")

  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets")

  useEffect(() => {
    if(!tickets) return
    const totalTickets : string[] = tickets;
    const numberOfTickets = totalTickets.reduce((acc, ticket) => {
      if(ticket === address) {
        acc++
      }
      return acc
    }
    , 0)
    setUserTickets(numberOfTickets)
    console.log(numberOfTickets);
  } , [tickets , address])
  console.log(isLotteryOperator , 'lottery operator')

  const handleClick = async() => {
    if(!ticketPrice) return
    const notification = toast.loading("Processing...")
    try {
      // console.log(ethers.utils.parseEther(Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString());
      let args = (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString()
      const data = await BuyTickets([ { value: ethers.utils.parseEther(args) } ])
    toast.success('Success', { id: notification })
    } catch (error) {
      console.info(error)
      toast.error('Whoops, something went wrong' , { id: notification })
    }
  }

  const onWidrawWinnings = async() => {
    const notification = toast.loading("Processing...")
    try {
      const data = await WithdrawWinnings([{}])
      toast.success('Success , you have successfully withdrawn your winnings' , { id: notification })
      
    } catch (error) {
      console.info(error)
      toast.error('Whoops, something went wrong' , { id: notification })
    }
  }

  if (isLoading) return <Loading />
  if (!address) return <Login />
  return (
    <div className="flex min-h-screen flex-col px-2 py-2 bg-[#091818]">
      <Head>Lottery App</Head>
      <div className="flex-1">
        <Header />
        <Marquee gradient={false} speed={100}>
          <div className="flex  space-x-4">
            <h4 className="text-white">
              Last Winner : {lastWinner?.toString()}
            </h4>
            <h4 className="text-white">
              Previews Winning : {lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount.toString())} {currency}
            </h4>
          </div>
        </Marquee>
      {
        isLotteryOperator === address && (
          <AdminControls contract={contract} />
        )
      }


        {
          winnings > 0 && ( 
            <div className='max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto'>
              <button className='p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full' onClick={onWidrawWinnings}>
                <p className='text-2xl font-semibold text-white'>
                  Winner winner chicken dinner
                </p>
                <p>
                  Total Winnings : {ethers.utils.formatEther(winnings.toString())} {currency}
                </p> 
                <br />                                                                                                                                    
                <p className='text-sm text-white font-semibold'>
                  Click here to withdraw
                </p>
              </button>
            </div>
          )
        }
       

        <div className="space-y-5 md:space-y-0 md:flex md:flex-row md:items-start md:space-x-5 px-10  justify-between max-w-7xl  py-8">
          <div className="stats-container flex-1">
            <h1 className="text-4xl font-semibold text-white text-center">
              NEXT DRAW
            </h1>
            <div className="flex items-center justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm text-white">Total Pool</h2>
                <p className="text-xl text-white">
                  {CurrentWinningReward && ethers.utils.formatEther(CurrentWinningReward.toString())}    {" "} {currency}
                </p>
              </div>
              <div className="stats">
                <h2 className="text-sm text-white">Tickets Remaining</h2>
                <p className="text-xl text-whi
                  <p>te">
                  {RemainingTickets?.toNumber()}
                </p>
              </div>
            </div>
            {/* count */}
            <div className='mt-5 mb-3'>
              <CountDownTimer />
            </div>
          </div>
          <div className="stats-container flex-1">
            <div className="stats-container">
              <div className="flex items-center justify-between space-x-2">
                <h2>Price per Ticket</h2>
                <p>
                  {ticketPrice && ethers.utils.formatEther(ticketPrice.toString())} {currency}
                </p>
              </div>
              <div className="flex items-center justify-between space-x-2 text-white p-3 bg-[#091818] border border-[#004337]">
                <p>Ticket</p>
                <input
                  type="number"
                  className="bg-transparent flex w-full text-white outline-none text-right"
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col space-y-2 mt-5">
                <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold ">
                  <p>Total Cost of Tickets</p>
                  <p>
                    {ticketPrice && ethers.utils.formatEther(ticketPrice.mul(quantity).toString())} {currency}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                  <p>Services Fees</p>
                  <p>
                    {ticketCommission && ethers.utils.formatEther(ticketCommission.toString())} {currency}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>
              <button onClick={handleClick}
                disabled = {RemainingTickets?.toNumber() < quantity || expiration?.toString() > Date?.now()}
                className="
        mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:text-gray-100 
        disabled:to-gray-600 
        disabled:cursor-not-allowed
      " 
              >
                Buy {quantity} Ticket for{" "} {ticketPrice && ethers.utils.formatEther(ticketPrice.mul(quantity).toString())} {currency}
              </button>
            </div>
            {
              userTickets > 0 && (
                <div className="mt-5">
                  <div className="stats flex-col items-center justify-between space-x-2">
                    <h2 className="text-sm text-white">Your have {userTickets} tickets</h2>
                   <div className="flex items-center justify-between space-x-2 flex-wrap max-w-sm gap-x-2 gap-y-2 flex-shrink-0">
                   {Array(userTickets).fill(" ").map((_, index) => (
                      <p key={index} className="text-5xl text-white text-center items-center justify-center">
                        🎫</p>
                    ))}
                   </div>
                  </div>
                </div>
              )
            }
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Home
