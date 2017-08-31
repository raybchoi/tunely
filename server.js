// setting and config
// require apps / thirdparty
const express = require('express');
const bodyParser = require('body-parser');


// generate a new express app and call it 'app'
const app = express();

// serve static files in public
app.use(express.static('public'))



app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname});
  // __direname => /Users/raychoi/WDI/03_week3/03_03_lab_tunely
});


app.listen(3000, function() {
  console.log('Server 3000 is up and running...')
});
