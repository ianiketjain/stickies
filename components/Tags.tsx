import React, { useState } from 'react'

const Tags = ({ tagsArray, myColor, handleChangeStickie }: any) => {
  const [isHover, setIsHover] = useState({ isHover: false, id: '' })

  return tagsArray?.map((tag: any, i: number) => (
    <div
      key={i}
      style={{ backgroundColor: myColor?.dark, color: myColor?.text }}
      className="group relative cursor-pointer px-2 text-xs py-0.5 rounded-md ml-2"
      onMouseOver={() => setIsHover({ isHover: true, id: tag })}
      onMouseLeave={() => setIsHover({ isHover: false, id: '' })}
    >
      <p className="group-hover:opacity-35">{tag}</p>
      {isHover?.id === tag && (
        <p
          className="absolute top-[-4px] left-[50%] font-bold text-base"
          onClick={() => {
            handleChangeStickie('remove-tag', tag)
          }}
        >
          x
        </p>
      )}
    </div>
  ))
}

export default Tags
