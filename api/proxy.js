const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://www.google.com'); // Replace with your URL
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching the external URL');
  }
}
