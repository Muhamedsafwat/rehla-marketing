import React from 'react'

const DnaHeader = ({ title, span }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center sm:justify-start">
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl italic font-medium leading-tight md:leading-[105px] text-TextColor">
          {title}
        </p>
        <p className="text-TextColor lg:-mt-4">{span}</p>
      </div>
    </div>
  )
}

export default DnaHeader
