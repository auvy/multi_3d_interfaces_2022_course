import "./speaker.scss"

import animeSpeaker from "../../assets/images/speaker.png"
import gif from "../../assets/gifs/YdBO.gif"
// @ts-ignore
import video1 from "../../assets/videos/anime_base.mp4";
// @ts-ignore
import video2 from "../../assets/videos/second_anime.mp4";

export const Speaker = () => {

  const startVideo = (e: React.SyntheticEvent) => {
    const video = e.target as HTMLVideoElement;
    video.play();
  }

  const stopVideo = (e: React.SyntheticEvent) => {
    const video = e.target as HTMLVideoElement;
    video.pause();
    video.currentTime = 0;
  }

  return (
    <div className="speaker">
      <div className="static">
        <video width="200" loop onMouseOver={startVideo} onMouseOut={stopVideo}>
          <source src={video2} type="video/mp4" />
        </video>
      </div>
      {/* <video width="240">
        <source src={video1} type="video/mp4" />
      </video> */}
    </div>
  )
}
