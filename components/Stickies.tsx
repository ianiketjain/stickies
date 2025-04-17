import { CircleIcon, SettingIcon } from '@/libs/SVG'
import Editor from './Editor'
import { useEffect, useRef, useState } from 'react'
import DropdownBox from './DropdownBox'
import { stickieColor } from '@/libs/constants'
import Tags from './Tags'

export const ColoredStickie: React.FC<{
  index?: number
  width?: number
  height?: number
  noteData?: any
  handleOpenDropdown?: any
  isOptionsVisible?: boolean
  isTagVisible?: boolean
  isHeadingVisible?: boolean
  currentFocus?: any
  setCurrentFocus?: any
  setNotes?: any
  notes?: any

  // this  is coming from DragtheStickie component
  setPosition?: any
  onMouseDown?: (e: React.MouseEvent) => void
}> = (props) => {
  const {
    notes,
    setNotes,
    index,
    currentFocus,
    setCurrentFocus,
    setPosition,
    onMouseDown,
    noteData,
    handleOpenDropdown,
    height = 350,
    width = 350,
    isOptionsVisible = true,
    isTagVisible = true,
    isHeadingVisible = true,
  } = props

  const [myNote, setMyNote] = useState(noteData)
  const divRef = useRef(null)
  const cardRef: any = useRef(null)
  const colorRef: any = useRef(null)
  const [readOnly, setReadOnly] = useState(true)
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const [dimensions, setDimensions] = useState({ width: width, height: height })
  const [isFullScreenAnime, setIsFullScreenAnime] = useState(false)
  const [toggleColor, setToggleColor] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isReload, setIsReload] = useState(false)

  useEffect(() => {
    setMyNote(noteData)
  }, [notes, noteData, isReload])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsSettingOpen(false)
      }
      if (colorRef.current && !colorRef.current.contains(event.target as Node)) {
        setToggleColor(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [cardRef, colorRef, toggleColor, isSettingOpen])

  const stopResizing = () => {
    if (divRef.current) {
      const { offsetWidth, offsetHeight } = divRef.current
      setDimensions({ width: offsetWidth, height: offsetHeight })
    }
  }

  const handleChangeStickie = (type: string, myData?: any) => {
    const i = currentFocus?.i
    if (i === undefined) return

    setNotes((prevNotes: any) => {
      let updatedNotes = [...prevNotes]

      if (type === 'delete') {
        updatedNotes.splice(myData, 1)
        setIsReload(true)
      } else if (type === 'remove-tag') {
        updatedNotes[i] = {
          ...updatedNotes[i],
          tags: updatedNotes[i]?.tags?.filter((tg: string) => tg !== myData),
        }
      } else {
        updatedNotes[i] = {
          ...updatedNotes[i],
          [type === 'remove-tag' ? 'tags' : type]: myData,
        }
      }

      return updatedNotes
    })
  }

  return (
    <>
      <div
        ref={divRef}
        onMouseUp={stopResizing}
        onMouseLeave={() => {
          setIsHovered(false)
          stopResizing()
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseDown={() => {
          setCurrentFocus && setCurrentFocus({ i: index, note: noteData })
        }}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          transition: isFullScreenAnime ? 'width 0.5s ease-in-out, height 0.5s ease-in-out' : '',
          zIndex: currentFocus?.i === index ? 10 : 5,
          background: isHovered ? myNote?.color?.medium : myNote?.color?.id,
          color: myNote?.color?.text,
        }}
        className={`relative overflow-auto bg-[#f0f0f0] hover:border-primary-900 rounded-lg hover:shadow-[0_0_10px_rgba(0,112,243,0.5)] 
          ${isOptionsVisible && 'resize'}`}
      >
        <div
          className="w-full h-full relative rounded-tr-md rounded-tl-md shadow-[-5px_-5px_10px_rgba(0,0,0,0.3)] overflow-hidden"
          onMouseDown={onMouseDown}
        >
          <div className="flex justify-between px-4 pt-2">
            {isHeadingVisible && (
              <input
                type={'text'}
                className={`text-xl text-ellipsis whitespace-nowrap overflow-hidden font-bold w-full bg-inherit outline-none 
                ${readOnly && 'cursor-auto'}`}
                readOnly={readOnly}
                defaultValue={myNote?.heading}
                onChange={(e: any) => handleChangeStickie('heading', e.target.value)}
                onBlur={(e: any) => {
                  setReadOnly(true)
                }}
              />
            )}

            {isOptionsVisible && (
              <div className="flex items-center gap-1 pl-2 absolute right-3">
                <button
                  ref={colorRef}
                  onClick={() => {
                    setToggleColor(!toggleColor)
                  }}
                  className="border-2 rounded-full"
                >
                  <CircleIcon width="0.8rem" color={myNote?.color?.id} />
                </button>
                <span
                  ref={cardRef}
                  className="block cursor-pointer"
                  onClick={() => {
                    setIsSettingOpen(!isSettingOpen)
                  }}
                >
                  <SettingIcon size="0.8rem" />
                </span>
              </div>
            )}
          </div>

          <div
            className={`break-words px-4 overflow-scroll scrollbar-hide text-base ${isTagVisible ? 'pt-4' : ''}`}
            style={{ height: 'auto' }}
            onMouseDown={(e) => {
              setCurrentFocus && setCurrentFocus({ i: index, note: noteData })
              e.stopPropagation()
            }}
          >
            <Editor
              isReload={isReload}
              setIsReload={setIsReload}
              fontSize={myNote?.fontSize}
              fontFamily={myNote?.fontFamily}
              index={index}
              currentFocus={currentFocus}
              tags={myNote?.tags}
              content={myNote?.content}
              handleChangeStickie={handleChangeStickie}
              width={dimensions?.width}
              height={dimensions?.height}
              isSimpleStickie={isTagVisible}
            />
          </div>
        </div>

        {isTagVisible && myNote?.tags?.length > 0 && (
          <div className="absolute bottom-0 w-full h-[3rem] flex items-center gap-2 p-1">
            <Tags tagsArray={myNote?.tags} myColor={myNote?.color} handleChangeStickie={handleChangeStickie} />
          </div>
        )}

        {toggleColor && (
          <DropdownBox
            array={stickieColor}
            type="color"
            className="top-10 right-0 w-9 overflow-scroll scrollbar-hide text-center whitespace-nowrap"
            onClick={(col: any) => handleChangeStickie('color', col)}
          />
        )}

        {isSettingOpen && (
          <DropdownBox
            array={['Edit Heading', 'Full screen', 'Add Tags', 'Delete', 'Info']}
            onClick={(type: string) => {
              if (type === 'Full screen') {
                setPosition({ x: 5, y: 75 })
                setDimensions({ width: window.innerWidth - 20, height: window.innerHeight - 90 })
                setIsFullScreenAnime(true)
                setTimeout(() => {
                  setIsFullScreenAnime(false)
                }, 2000)
              }
              if (type === 'Edit Heading') {
                setReadOnly(false)
              }
              if (type === 'Delete') {
                handleChangeStickie('delete', index)
              }
              setIsSettingOpen(false)
              handleOpenDropdown(type)
            }}
            isOpen={isSettingOpen}
            className="top-10 right-0 max-h-96 w-fit whitespace-nowrap overflow-y-auto fontFamily text-black"
          />
        )}
      </div>
    </>
  )
}
