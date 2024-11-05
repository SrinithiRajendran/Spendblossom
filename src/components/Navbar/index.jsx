import React from 'react'
import "./index.css"
import { IoFlowerSharp , IoWallet } from "react-icons/io5";
import { Link } from "react-router-dom"


const Navbar = ({walletBalance}) => {
  return (
      <nav className='bg-gradient-to-r from-[#dbe4d2] to-[#bdf8b6] p-4 items-center '>
      <div className='flex items-center justify-between'>
        <Link to="/">
          <h1 className='text-[#0d4102] font-bold fontstyle flex items-center wallet-balance'><span className='text-[#410454] '>S</span>pend<span className='text-[#410454]'>B</span>l<IoFlowerSharp className='text-sm mt-1 text-[#a20647]' />ss<IoFlowerSharp className='mt-1 text-sm text-[#a20647]' />m</h1>
              </Link>
              <div className='flex items-center'>
                  <IoWallet  className='mr-2 text-[#440323] wallet-balance'/>
                  <h1 className='text-[#58063a] font-bold mr-2 nav-balance '>Wallet Balance : </h1>
                  <p className='font-bold text-[#035005] wallet-balance'>₹ {walletBalance}</p>
        </div>
        
        </div>
    </nav>
  )
}

export default Navbar