import whisper

model = whisper.load_model("base")

def transcribe(path):
  result = model.transcribe(path, language="Ukrainian")
  return result["text"]

def transcribeEN(path):
  result = model.transcribe(path, language="English")
  return result["text"]