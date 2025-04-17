import React, { useEffect, useRef, useState } from 'react'

const DragtheStickie = ({
  handleChangeStickie,
  children,
  myPosition,
}: {
  handleChangeStickie?: any
  children: React.ReactElement
  myPosition: { x: number; y: number }
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(myPosition)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setPosition(myPosition)
  }, [myPosition])

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = boxRef.current?.getBoundingClientRect()
    if (rect) {
      setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    handleChangeStickie('position', { x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  return (
    <div
      ref={boxRef}
      style={{
        position: 'absolute',
        left: `${position?.x}px`,
        top: `${position?.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Attach handleMouseDown to the child and catch from there */}
      {React.cloneElement(children, { onMouseDown: handleMouseDown, setPosition: setPosition })}
    </div>
  )
}

export default DragtheStickie
