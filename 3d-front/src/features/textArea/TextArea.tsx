import { useContext, useEffect, useRef, useState } from "react"
import "quill/dist/quill.snow.css"
import { DownloadText } from "../downloadText/DownloadText"

import "./textArea.scss"
import { TextContext } from "../../App"
import ReactQuill from "react-quill"


export function TextArea () {
  const reactQuillRef = useRef<ReactQuill>(null);

  const { text, setText } = useContext(TextContext)

  const handleChange = (val: string) => { 
    console.log(val)
    setText(val)
  }

  return (
    <div className="text-area">
      <DownloadText/>
      <ReactQuill
        className="text-area__quill"
        ref={reactQuillRef}
        theme="snow"
        placeholder="Start writing..."
        modules={{
          // toolbar: {
          //   container: TOOLBAR_OPTIONS
          // },
          // "emoji-toolbar": true,
          // "emoji-textarea": false,
          // "emoji-shortname": true
        }}
        value={text}
      onChange={handleChange}
      />
    </div>
  )
}
