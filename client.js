const axios = require('axios');

const apiUrl = 'http://localhost:3000/getWordPressMetadata';

axios.get(apiUrl)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

