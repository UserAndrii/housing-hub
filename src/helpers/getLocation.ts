export const getLocation = async (address: string) => {
  const apiKey = 'AIzaSyA4vhbUGL6KAIkyymqbxNV-xdP03HZaB48';
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

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
