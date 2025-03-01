import React from 'react'

const Popup = ({ onClose, children, className }: any) => {
  return (
    <div className="z-[99] fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75" onClick={onClose}>
      <div
        className={`bg-white px-4 rounded-lg ${className}`}
        style={{
          background: 'rgba( 178, 182, 255, 0.2 )',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 5.5px )',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
        }}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation()
        }}
      >
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  )
}

export default Popup
