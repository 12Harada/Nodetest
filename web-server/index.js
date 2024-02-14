const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
//public配下のソースを参照できるようにする
const path = require("path")
app.use(express.static(path.join(__dirname,"public")))

// External API endpoint
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

app.get('/', function (req, res) {
    res.redirect("/index.html")
  })


// Route handler for the home page
app.post('/api/v1/json', async (req, res) => {
    try {
        // Fetch data from external API
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Send the data to the client
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000)