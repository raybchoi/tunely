// require apps / thirdparty
const express = require('express');
const bodyParser = require('body-parser');


// generate a new express app and call it 'app'
const app = express();

app.get('/', (req, res) => {
  console.log('Yo! high-five broooooo!~!');
});

app.listen(3000, function() {
  console.log('Server 3000 is up and running...')
});
