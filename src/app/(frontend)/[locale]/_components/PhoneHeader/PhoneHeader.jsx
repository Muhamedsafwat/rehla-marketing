import React from 'react'

const PhoneHeader = () => {
  return (
    <div className="lg:hidden flex-col bg-black flex text-center text-white min-h-screen justify-center items-center">
      <img src="/Logo/Logo.png" className="w-30" />
      <p className="text-[34px] leading-[31px]">From Vision</p>
      <p className="font-medium text-[53px] mt-4 italic leading-[53px]">To Voice</p>
    </div>
  )
}

export default PhoneHeader
