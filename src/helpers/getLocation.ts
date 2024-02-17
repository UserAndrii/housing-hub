const REACT_APP_GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;

export const getLocation = async (address: string) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${REACT_APP_GEO_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results.length > 0) {
      return Object.values(data.results[0].geometry.location);
    } else {
      console.error('Адреса не знайдена');
      return null;
    }
  } catch (error) {
    console.error('Помилка при отриманні координат:', error);
    return null;
  }
};
