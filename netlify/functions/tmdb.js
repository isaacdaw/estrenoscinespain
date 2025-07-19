// netlify/functions/tmdb.js
export async function handler(event, context) {
  const API_KEY = process.env.TMDB_API_KEY;
  const page = event.queryStringParameters.page || 1;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=es-ES&region=ES&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
