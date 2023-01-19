
import React, { useContext, useEffect, useState } from "react"

import "./downloadText.scss"
import { TextContext } from "../../App"

interface dlprops {
  text: string,
}

export const DownloadText = () => {

  // const [text, setText] = useState("");
  // const value = { text, setText };
  const { text, setText } = useContext(TextContext)

  const downloadTxtFile = () => {
    const result = text
    // .slice(3, -4);
    console.log(result)
    const element = document.createElement("a");
    const file = new Blob([result as BlobPart], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = "result.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  
  return (
    <div className="download-text">
      <button className="download-button" onClick={downloadTxtFile}>Download txt</button>
    </div>
  );
}

// ReactDOM.render(<MyApp />, document.getElementById("myApp"));