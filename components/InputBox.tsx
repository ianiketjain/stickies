import { SearchIcon } from '@/libs/SVG'
import React from 'react'

const InputBox = ({ onBlur, onChange, onClick, value, color }: any) => {
  return (
    <div className="relative">
      <input
        className="pl-8 pr-2 border border-primary-500 rounded-lg outline-none text-white bg-transparent mt-2"
        type="text"
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e)}
        onClick={(e) => onClick(e)}
      />
      <SearchIcon color={color?.id} className="absolute top-[8px] left-2" width="1.2rem" />
    </div>
  )
}

export default InputBox
