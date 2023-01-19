import React, { useContext, useEffect, useState } from "react"
// @ts-ignore
import MicRecorder from "mic-recorder-to-mp3"
// @ts-ignore
import { saveAs } from "file-saver"
import { FaPlay, FaStop } from "react-icons/fa"
import gif from "../../assets/gifs/YdBO.gif"

import "./audioRecording.scss"
import { TextContext } from "../../App"
import { getCorrectedText } from "../../services/grammar"
import { recognizeText } from "../../services/speechRecognition"
import { playSpeech } from "../../services/avatarSpeech"


const Mp3Recorder = new MicRecorder({ bitRate: 128 })

export const AudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [blobURL, setBlobURL] = useState("")
  const [isBlocked, setIsBlocked] = useState(false)
  const [dialogText, setDialogText] = useState("Hello! Start recording?")
  const { setText } = useContext(TextContext);

  useEffect(() => {
    if (blobURL) {
      // const isConfirmed = window.confirm("Do you want to process this record?")

      // isConfirmed && makeRequest...
    }
  }, [blobURL])

  useEffect(() => {
    if (isRecording) {
      setBlobURL("")
      setDialogText("Recording...")
    } else {
      setDialogText("Click on the arrow to record!")
    }
  }, [isRecording])

  useEffect(() => {
    // @ts-ignore
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted")
        setIsBlocked(false)
      },
      () => {
        console.log("Permission Denied")
        setIsBlocked(true)
      }
    )
  }, [])
  
  const startRecording = () => {
    if (isBlocked) {
      console.log("Permission Denied")
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true)
        })
        .catch((e: any) => console.error(e))
    }
  }

  const stopRecording = async () => {
    try {
      //voice "wait"
      playSpeech("wait").play();

      const [buffer, blob] = await Mp3Recorder.stop().getMp3();
      console.log(buffer)
  
      const blobURL = URL.createObjectURL(blob)
      setBlobURL(blobURL)
      setIsRecording(false)
  
      const text = await recognizeText(blob);
      const correctedText = await getCorrectedText(text);
      setText(correctedText);
      //"finished" speech
      playSpeech("end").play();

    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="audio-recording">
      <div className="audio-recording__dialog-text">{dialogText}</div>
      <div className="audio-recording__play-stop">
        {!isRecording && (
          <button
            className="audio-recording__start"
            onClick={startRecording}
            disabled={isRecording}
          >
            <FaPlay />
          </button>
        )}
        {isRecording && (
          <button
            className="audio-recording__stop"
            onClick={stopRecording}
            disabled={!isRecording}
          >
            <FaStop />
          </button>
        )}
        {isRecording && (
          <img className="audio-recording__gif" src={gif} alt="" />
        )}
      </div>
      {/* {blobURL && <audio src={blobURL} controls={true} />} */}
    </div>
  )
}
