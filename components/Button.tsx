import { DropDownIcon } from '@/libs/SVG'
import React from 'react'

const Button = ({ onClick, type, label, className, ...props }: any) => {
  return type === 'size' ? (
    <button onClick={() => onClick()} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
      {label}
      <DropDownIcon isOpen={props?.isOpen} />
    </button>
  ) : (
    <button onClick={(e) => onClick(e)} className="group button relative border-none bg-transparent outline-none cursor-pointer font-sans">
      <span className="edge absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l bg-primary-900"></span>
      <div className="front relative flex items-center justify-center pl-3 pr-8 py-1 text-base text-white bg-primary-500 rounded-lg -translate-y-1 transition-transform duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)]">
        <span>Add</span>
        <span className="absolute right-3 group-hover:rotate-180 transition-all delay-75 ease-in-out w-fit h-fit">
          <DropDownIcon color="#ffffff" />
        </span>
      </div>
    </button>
  )
}

export default Button
