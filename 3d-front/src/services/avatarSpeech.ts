export const playSpeech = (voice: string) => {
  let postf: number = Math.floor(Math.random() * 3 + 1)
  return new Audio(require(`../assets/voice/${voice}${postf}.mp3`));
}