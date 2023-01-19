export const recognizeText = async (data: Blob) => {
  var form = new FormData();
  form.append('file', data, 'data.mp3');
  form.append('title', 'data.mp3');
  const response = await fetch('http://localhost:5000/save-record', {
      method: 'POST',
      body: form,
      // cache: false,
      // processData: false,
      // contentType: false
  });
  const result = await response.text();
  console.log(result);

  return result;
}
