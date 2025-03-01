import { CircleIcon } from '@/libs/SVG'
import React from 'react'

const DropdownBox = ({ array, onClick, myState, className, type }: any) => {
  return (
    <div className={`absolute bg-white border border-gray-200 rounded-md shadow-lg z-50 ${className}`}>
      {array.map((data: any, i: number) => (
        <div
          key={i}
          onClick={() => onClick(data)}
          className={`text-center text-sm cursor-pointer hover:bg-primary-300 hover:rounded-lg
            ${type !== 'color' && 'px-4 py-2'}
            ${myState === data ? 'bg-gray-100 font-bold' : ''}`}
          style={{ fontSize: type === 'size' ? data : '', fontFamily: type === 'family' ? data : 'Funnel Display' }}
        >
          {type === 'color' ? <CircleIcon color={data?.id} /> : data}
        </div>
      ))}
    </div>
  )
}

export default DropdownBox
