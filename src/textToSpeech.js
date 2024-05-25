import axios from 'axios';

const apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';

export const textToSpeech = async (text, lang = 'en-US') => {
  const url = https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey};

  const data = {
    input: { text },
    voice: { languageCode: lang, ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' }
  };

  try {
    const response = await axios.post(url, data);
    const audioContent = response.data.audioContent;
    const audio = new Audio(data:audio/mp3;base64,${audioContent});
    audio.play();
  } catch (error) {
    console.error('Error synthesizing speech:', error);
  }
};