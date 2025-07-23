export async function handler(event, context) {
  const API_KEY = process.env.TMDB_API_KEY;
  const page = event.queryStringParameters.page || 1;

  const urls = [
    `https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=ES&page=${page}&api_key=${API_KEY}`,
    `https://api.themoviedb.org/3/movie/now_playing?language=es-ES&region=ES&page=${page}&api_key=${API_KEY}`
  ];

  try {
    const allResults = [];

    for (const url of urls) {
      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data.results)) {
        allResults.push(...data.results);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ results: allResults }), // ⬅️ Devuelve un array combinado
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener los datos", error: error.message }),
    };
  }
}
