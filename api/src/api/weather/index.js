import axios from 'axios';
const baseUrl = 'http://api.weatherapi.com/v1/';
const keyWeather = process.env.KEY_WEATHER;

const apiWeather = axios.create({
  baseURL: baseUrl,
  params: {
    key: keyWeather,
  },
});

export const getWeather = async (city) => {
  try {
    const response = await apiWeather.get('/current.json', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе погоды:', error);
    throw error;
  }
};
