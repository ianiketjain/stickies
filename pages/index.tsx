import Button from '@/components/Button'
import DropdownBox from '@/components/DropdownBox'
import HeadTag from '@/components/HeadTag'
import InputBox from '@/components/InputBox'
import { ColoredStickie } from '@/components/Stickies'
import { CircleIcon, DownloadIcon, SearchIcon } from '@/libs/SVG'
import React, { useEffect, useRef, useState } from 'react'
import DragtheStickie from '@/components/DragStickie'
import { themes, fontSizes, fontFamilies, stickies, stickieColor } from '@/libs/constants'
import Popup from '@/components/Popup'
import { Logo } from '@/components/Logo'
import { v4 } from 'uuid'
import { getDataFromLocalStorage, getThemeFromLocalStorage, setDataToLocalStorage, setThemeToLocalStorage } from '@/db/stickies'

const HomePage = () => {
  const sizeRef: any = useRef(null)
  const colorRef: any = useRef(null)
  const isInitialRender = useRef(true)
  const fontfamilyRef: any = useRef(null)
  const [tag, setTag] = useState('')
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState<any>([])
  const [fontSize, setFontSize] = useState('12px')
  const [fontFamily, setFontFamily] = useState('Arial')
  const [toggleSearch, setToggleSearch] = useState(false)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const [addStickie, setAddStickie] = useState(false)
  const [popup, setPopup] = useState<any>({ isOpen: false })
  const [currentFocus, setCurrentFocus] = useState<any>({ i: -1 })
  const [isFontFamilyOpen, setIsFontFamilyOpen] = useState(false)
  const [theme, setTheme] = useState<{ color: string; id: string }>(themes[0])
  const [constData, setConstData] = useState([])

  let newStickies = {
    id: `notes_${v4()}`,
    type: 'colored',
    tags: ['tag'],
    fontSize: '14px',
    fontFamily: 'Arial',
    heading: 'New Note',
    content: '⚫️  Shortcuts <br/>Upper Case : cmd/ctrl + k<div>Lower Case : cmd/ctrl + L</div>',
    color: stickieColor[Math.floor(Math.random() * 10)],
    position: { x: 150 + Math.random() * 100 + new Date().getSeconds(), y: 150 + Math.random() * 100 + new Date().getSeconds() },
    found: false,
    dateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sizeRef.current && !sizeRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
      if (fontfamilyRef.current && !fontfamilyRef.current.contains(event.target as Node)) {
        setIsFontFamilyOpen(false)
      }
      if (colorRef.current && !colorRef.current.contains(event.target as Node)) {
        setIsColorOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen, isFontFamilyOpen, isColorOpen])

  useEffect(() => {
    const asyncFunc = async () => {
      let notesData = getDataFromLocalStorage()
      if (!Array.isArray(notesData) || notesData.length === 0) {
        notesData = stickies
      }

      let myNotes = notesData?.map((sticky: any) => {
        return { ...sticky, found: false }
      })

      setNotes(myNotes)
      setConstData(myNotes)

      let mytheme = getThemeFromLocalStorage()
      setTheme(mytheme)
    }
    asyncFunc()
  }, [])

  useEffect(() => {
    let newData = JSON.stringify(notes)
    let oldData = JSON.stringify(constData)

    const handler = setTimeout(() => {
      if (newData !== oldData) {
        notes?.length > 0 && setDataToLocalStorage(notes)
        console.log('Set to Local Storage')
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [notes])

  const handleOpenDropdown = (type: string) => {
    if (type === 'Info') {
      setPopup({ isOpen: true, type: type })
    } else if (type === 'Add Tags') {
      setPopup({ isOpen: true, type: type })
    }
  }

  const handleAddTag = () => {
    let i = currentFocus?.i
    setNotes((prevNotes: any) => {
      const updatedNotes = [...prevNotes]
      updatedNotes[i] = {
        ...updatedNotes[i],
        tags: [...updatedNotes[i].tags, tag],
      }
      return updatedNotes
    })
    setPopup({ isOpen: false })
    setTag('')
  }

  const handleChangeStickie = (type: string, myData?: any) => {
    let i = currentFocus?.i

    if (notes?.length === 0) return
    setNotes((prevNotes: any) => {
      const updatedNotes = [...prevNotes]

      if (type === 'fontsize') {
        updatedNotes[i] = { ...updatedNotes[i], fontSize: myData }
      } else if (type === 'fontfamily') {
        updatedNotes[i] = { ...updatedNotes[i], fontFamily: myData }
      } else if (type === 'position') {
        updatedNotes[i] = { ...updatedNotes[i], position: myData }
      }

      return updatedNotes
    })
  }

  const filterStickies = () => {
    const lowerCaseSearch = search?.toLowerCase()

    return notes?.map((sticky: any) => {
      const isFound =
        sticky?.tags?.some((tag: string) => tag?.toLowerCase().includes(lowerCaseSearch)) ||
        sticky?.content?.toLowerCase().includes(lowerCaseSearch) ||
        sticky?.heading?.toLowerCase().includes(lowerCaseSearch)

      return { ...sticky, found: !isFound }
    })
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (search === '') {
      setNotes(
        notes?.map((sticky: any) => {
          return { ...sticky, found: false }
        })
      )
    } else {
      const filter = filterStickies()
      setNotes(filter)
    }
  }, [search])

  return (
    <>
      <HeadTag />
      <main
        className={`w-full h-screen theme-${theme?.color}`}
        style={{
          backgroundImage: `url(${'/bgimg.jpg'})`,
        }}
      >
        <nav className="p-4 flex items-center justify-between">
          <Logo color={theme.id} />
          <div className="flex items-center gap-6 text-base">
            {!toggleSearch && (
              <SearchIcon
                className="cursor-pointer mt-2"
                color={theme?.id}
                onMouseOver={() => setToggleSearch(true)}
                onMouseLeave={() => {
                  setTimeout(() => {
                    !search && setToggleSearch(false)
                  }, 3000)
                }}
              />
            )}

            {toggleSearch && (
              <InputBox
                onChange={(e: any) => setSearch(e.target.value)}
                onClick={(e: any) => {
                  if (e.key === 'Enter') {
                    alert('Click search')
                  }
                }}
                value={search}
                color={theme}
                autoFocus
              />
            )}

            <div
              className="mt-2 cursor-pointer"
              onClick={() => {
                const textData = JSON.stringify(notes, null, 2) // Format as readable JSON
                const blob = new Blob([textData], { type: 'text/plain' }) // Create Blob
                const url = URL.createObjectURL(blob) // Create URL

                const a = document.createElement('a')
                a.href = url
                a.download = 'notes.json' // Set download file name
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url) // Clean up URL
              }}
            >
              <DownloadIcon color={theme?.id} />
            </div>
            <div className="relative mt-2" ref={colorRef}>
              <button onClick={() => setIsColorOpen(!isColorOpen)}>
                <CircleIcon color={theme?.id} />
              </button>
              {isColorOpen && (
                <DropdownBox
                  array={themes}
                  type="color"
                  className="top-10 right-0 w-9 whitespace-nowrap"
                  onClick={(thm: any) => {
                    setTheme(thm)
                    setThemeToLocalStorage(thm)
                    setIsColorOpen(false)
                  }}
                />
              )}
            </div>

            <div className="relative font-bold text-primary-500" ref={sizeRef}>
              <button
                className="flex items-center gap-2"
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
              >
                {fontSize}
              </button>
              {isOpen && (
                <DropdownBox
                  array={fontSizes}
                  onClick={(size: string) => {
                    handleChangeStickie('fontsize', size)
                    setFontSize(size)
                    setIsOpen(false)
                  }}
                  myState={fontSize}
                  type="size"
                  className="top-10 right-[-20px] w-24"
                />
              )}
            </div>
            <div className="relative font-bold text-primary-500" ref={fontfamilyRef}>
              <button className="flex items-center gap-2" onClick={() => setIsFontFamilyOpen(!isFontFamilyOpen)}>
                {fontFamily}
              </button>
              {isFontFamilyOpen && (
                <DropdownBox
                  type="family"
                  ref={fontfamilyRef}
                  array={fontFamilies}
                  myState={fontFamily}
                  isOpen={isFontFamilyOpen}
                  className="top-10 right-0 max-h-96 w-fit whitespace-nowrap overflow-y-auto"
                  onClick={(family: string) => {
                    handleChangeStickie('fontfamily', family)
                    setFontFamily(family)
                    setIsFontFamilyOpen(false)
                  }}
                />
              )}
            </div>
            <div className="mt-2 relative">
              <Button onClick={() => setAddStickie(!addStickie)} />
              {addStickie && (
                <div
                  className="z-[80] fixed inset-0 flex items-center justify-center bg-[#181717] bg-opacity-75"
                  onClick={() => {
                    addStickie && setAddStickie(false)
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-2xl p-[1.12rem] absolute z-[99] top-[4rem] right-[2rem] flex gap-6 items-center"
                    style={{
                      boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div
                      onClick={() => {
                        setNotes((prevNotes: any) => [...prevNotes, newStickies])
                        setAddStickie(false)
                      }}
                      className="flex flex-col gap-2 items-center justify-center text-primary-100"
                    >
                      <p className="font-semibold">Classic </p>
                      <div className="w-[8rem] h-[8rem]">
                        <ColoredStickie
                          noteData={{
                            content: 'This is Stckie',
                            tags: ['Bagpack'],
                            heading: 'Travel',
                            color: { name: 'green', id: '#43A047', medium: '#388E3C', dark: '#1B5E20', text: '#ffffff' },
                          }}
                          width={128}
                          height={128}
                          isOptionsVisible={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="pl-10 flex gap-6 mt-10">
          {notes?.map((note: any, i: number) => {
            if (note?.found) return <div key={i}></div>

            return (
              <DragtheStickie myPosition={note?.position} handleChangeStickie={handleChangeStickie} key={i}>
                <ColoredStickie
                  index={i}
                  notes={notes}
                  setNotes={setNotes}
                  currentFocus={currentFocus}
                  setCurrentFocus={setCurrentFocus}
                  handleOpenDropdown={handleOpenDropdown}
                  noteData={note}
                />
              </DragtheStickie>
            )
          })}
        </div>
        {/* <div className="h-[20rem] w-[20rem] border border-white rounded-br-3xl">Aniket</div> */}
      </main>

      {popup?.isOpen && (
        <Popup onClose={() => setPopup({})} className="bg-primary-200">
          {popup?.type === 'Info' && (
            <div className="login-box w-[30rem] text-primary-100">
              <table>
                <tr>
                  <td className="px-4 whitespace-nowrap">Created At :</td>
                  <td className="whitespace-nowrap">{currentFocus?.note?.dateTime}</td>
                </tr>
                <tr>
                  <td className="px-4">Font :</td>
                  <td>{currentFocus?.note?.fontFamily}</td>
                </tr>
                <tr>
                  <td className="px-4">Font Size : </td>
                  <td>{currentFocus?.note?.fontSize}</td>
                </tr>
                <tr>
                  <td className="px-4">type : </td>
                  <td>{currentFocus?.note?.type}</td>
                </tr>
              </table>
            </div>
          )}

          {popup?.type === 'Add Tags' && (
            <div className="login-box">
              <p className="text-center text-primary-200">Add Tag to Card</p>
              <div className="user-box pt-2">
                <input
                  type="text"
                  autoFocus
                  value={tag}
                  onChange={(e: any) => setTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag()
                    }
                  }}
                />
              </div>
              <center>
                <button className="login-boxBtn" onClick={handleAddTag}>
                  Save
                  <span className="buttonSpan"></span>
                </button>
              </center>
            </div>
          )}
        </Popup>
      )}
    </>
  )
}

export default HomePage
