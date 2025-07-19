const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const API_KEY = process.env.TMDB_API_KEY;
  const baseUrl = 'https://api.themoviedb.org/3/movie/upcoming';
  const params = `language=es-ES&region=ES&api_key=${API_KEY}`;

  let results = [];

  for (let page = 1; page <= 2; page++) {
    const res = await fetch(`${baseUrl}?page=${page}&${params}`);
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Error al obtener datos de TMDb" })
      };
    }
    const data = await res.json();
    results = results.concat(data.results);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
};
