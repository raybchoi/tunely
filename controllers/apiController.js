
function index(req, res) {
  res.json({
    message: 'Welcome to tunely!',
    documentation_url: 'https://github.com/sf-wdi-labs/tunely',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'
      }
    ]
  });
}

// this is a route for the api to respond with a JSON object that contains the information above if you went to localhost:3000/api
// self-documenting endpoints
// - if you get to the API endpoint tells you about the api
module.exports = {
  index: index
}
