export async function handler(event, context) {
  const API_KEY = process.env.TMDB_API_KEY;
  const page = event.queryStringParameters.page || 1;

  const url_estrenos = `https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=ES&page=${page}&api_key=${API_KEY}`;
  const url_cartelera = `https://api.themoviedb.org/3/movie/now_playing?language=es-ES&region=ES&page=${page}&api_key=${API_KEY}`;
  url_list = [url_cartelera,url_estrenos]
  try {
    for (url in url_list){
      const response = await fetch(url);
      const data = await response.json();
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener los datos", error: error.message }),
    };
  }
}
