const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get gamepk from query parameters
    const { gamepk } = event.queryStringParameters || {};
    
    if (!gamepk) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'gamepk parameter is required'
        })
      };
    }

    // Query the database for movie data
    const query = `
      SELECT movie_data 
      FROM game_detail 
      WHERE gamepk = $1 
      AND movie_data IS NOT NULL 
      AND array_length(movie_data, 1) > 0
    `;
    
    const result = await pool.query(query, [gamepk]);
    
    // Extract movie_data from results (movie_data is an array)
    const movies = result.rows
      .flatMap(row => row.movie_data || [])
      .filter(movie => movie && movie.trim() !== '');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(movies)
    };

  } catch (error) {
    console.error('Database error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
}; 