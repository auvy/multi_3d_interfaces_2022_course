import { RecordDialog } from "./features/recordDialog/RecordDialog"
import { TextArea } from "./features/textArea/TextArea"
import { DownloadText } from "./features/downloadText/DownloadText"

import "./App.scss"
import { Speaker } from "./features/speaker/Speaker"
import { playSpeech } from "./services/avatarSpeech"

import { createContext, useState, useEffect } from "react";

export const TextContext = createContext({ text: '', setText: (t: string) => { } });


function App() {
  const [text, setText] = useState("");
  const value = { text, setText }

  useEffect(() => {
    playSpeech("hello").play();
  }, []);


  return (
    <TextContext.Provider value={value}>
      <div className="app">
        <TextArea />
        <div className="record-area">
          <RecordDialog />
          <Speaker />
        </div>
      </div>
    </TextContext.Provider>
  )
}

export default App
