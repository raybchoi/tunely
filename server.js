// setting and config
// require apps / thirdparty
const express = require('express');
const bodyParser = require('body-parser');
// allows to the db in the models folder
const db = require('./models')

//go back to controllers
const controllers = require('./controllers')

// generate a new express app and call it 'app'
const app = express();

// serve static files in public
app.use(express.static('public'))



app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname});
  // __direname => /Users/raychoi/WDI/03_week3/03_03_lab_tunely
});

app.get('/api',  controllers.api.index);
// cotrollers is calling var from up top that says go to ./controllers folder and finding the index file and looks the export sees that api name means look at the apiController.js file find the export and see what the index name is.

app.listen(3000, function() {
  console.log('Server 3000 is up and running...')
});
