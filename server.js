const express = require('express');
var path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'code')));
const port = process.env.PORT || 5000;

const myvid1Content = require('./code/myvid1/data.json');
const myvid2Content = require('./code/myvid2/data.json');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET routes
app.get('/myvid1', (req, res) => {
  res.send({ express: JSON.stringify(myvid1Content)});
});

app.get('/myvid2', (req, res) => {
  res.send({ express: JSON.stringify(myvid2Content)});
});

app.get('*', function(req, res){
  res.send('404', 404);
});