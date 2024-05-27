const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/query', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post('http://localhost:8000/query', { question });
    res.json(response.data);
  } catch (error) {
    console.error('Error querying the LangChain backend:', error);
    res.status(500).send('Error querying the LangChain backend.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
