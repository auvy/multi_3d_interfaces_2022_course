export const getCorrectedText = async (text: string) => {
  // get
  const params = new URLSearchParams();
  params.append('text', text);
  params.append('language', 'uk');
  const response = await fetch('https://api.languagetoolplus.com/v2/check', {
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST'
  });
  const result = await response.json();

  // correct
  let positionIndex = 0;
  let correctedText = text;

  for (const match of result.matches) {
    const replacement = match.replacements[0].value;
    const target = correctedText.substring(match.offset + positionIndex, match.offset + match.length + positionIndex);
    correctedText = correctedText.replace(target,replacement);

    positionIndex = replacement.length - match.length;
  }

  return correctedText;
}