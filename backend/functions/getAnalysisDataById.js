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

    // Query the database for analysis data
    const query = `
      SELECT analysis_data
      FROM game_detail 
      WHERE gamepk = $1 
      AND analysis_data IS NOT NULL 
    `;
    
    const result = await pool.query(query, [gamepk]);
    
    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'Analysis data not found for the specified gamepk'
        })
      };
    }

    // Get the first row (assuming one game per gamepk)
    const row = result.rows[0];
    
    // Parse the analysis_data JSONB
    const analysisData = row.analysis_data;
    
    // Create the response structure matching the schema
    const response = analysisData;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
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