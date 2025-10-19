const express = require('express');
const generateHomePage = require('./home');
const { storeNewResource, loadResources } = require('./resources');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(generateHomePage());
});

app.post('/data', (req, res) => {
  const { body } = req;
  console.log(`${JSON.stringify(body)}`);
  res.json({
    message: 'Data received successfully',
    receivedData: body
  });
});

app.get('/resources', (req, res) => {
  const result = loadResources();

  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

app.post('/add-resource', (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ success: false, message: 'No resource text provided' });
  }

  const result = storeNewResource(userInput);
  res.json(result);
});

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

module.exports = app;
