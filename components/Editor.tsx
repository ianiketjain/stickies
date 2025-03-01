import React, { useEffect, useRef } from 'react'

const Editor = ({
  isReload,
  setIsReload,
  index,
  currentFocus,
  tags,
  width,
  height,
  handleChangeStickie,
  content,
  fontSize,
  fontFamily,
  isReadonly = false,
}: any) => {
  const editorRef: any = useRef(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML === '') editorRef.current.innerHTML = content
    if (editorRef.current && isReload) editorRef.current.innerHTML = content

    setTimeout(() => {
      setIsReload(false)
    }, 3000)
  }, [content, isReload])

  const transformSelectedText = (type: 'uppercase' | 'lowercase') => {
    const selection = window.getSelection()
    if (!selection?.rangeCount) return

    const range = selection.getRangeAt(0)
    const selectedText = range.toString()

    const transformedText = type === 'uppercase' ? selectedText.toUpperCase() : selectedText.toLowerCase()

    range.deleteContents()
    range.insertNode(document.createTextNode(transformedText))
  }

  const toggleHighlight = (color: string) => {
    const selection = window.getSelection()
    if (!selection?.rangeCount) return

    const range = selection.getRangeAt(0)
    const selectedText = range.toString()

    if (!selectedText) return

    // Create a temporary span to check existing highlight
    const span = document.createElement('span')
    span.innerHTML = selectedText

    // Check if already highlighted
    if (selection.anchorNode?.parentElement?.style.backgroundColor === color) {
      // Remove highlight
      document.execCommand('hiliteColor', false, 'transparent')
    } else {
      // Apply highlight
      document.execCommand('hiliteColor', false, color)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'b': // Bold - Cmd/Ctrl+B
            e.preventDefault()
            document.execCommand('bold')
            setTimeout(() => {
              saveContent()
            }, 0)
            break

          case 'i': // Italic - Cmd/Ctrl+I
            e.preventDefault()
            document.execCommand('italic')
            saveContent()
            break

          case 'u': // Underline - Cmd/Ctrl+U
            e.preventDefault()
            document.execCommand('underline')
            saveContent()
            break

          case 's': // Strikethrough - Cmd/Ctrl+S
            e.preventDefault()
            document.execCommand('strikeThrough')
            saveContent()
            break

          case 'h': // Highlight - Cmd/Ctrl+H
            e.preventDefault()
            toggleHighlight('yellow')
            saveContent()
            break

          case 'k': // Uppercase - Cmd/Ctrl+K
            e.preventDefault()
            transformSelectedText('uppercase')
            saveContent()
            break

          case 'l': // Lowercase - Cmd/Ctrl+L
            e.preventDefault()
            transformSelectedText('lowercase')
            saveContent()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const saveContent = () => {
    if (editorRef.current && index === currentFocus?.i) {
      handleChangeStickie && handleChangeStickie('content', editorRef.current.innerHTML)
    }
  }

  return (
    <div
      ref={editorRef}
      contentEditable={!isReadonly}
      className="cursor-text rounded focus:outline-none overflow-scroll scrollbar-hide "
      onInput={saveContent}
      style={{
        fontSize: fontSize,
        fontFamily: fontFamily,
        width: width - 30,
        height: tags?.length > 0 ? height - 95 : height - 60,
        whiteSpace: 'pre-wrap',
      }}
    ></div>
  )
}

export default Editor
