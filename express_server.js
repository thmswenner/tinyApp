var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (request, response) => {
  response.send("Hello!");
});

app.get("/urls.json", (request, response) => {
  response.json(urlDatabase);
});

app.get('/hello', (request, response) => {
  response.send('<html><h1>Hello World</h1></html>\n')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});