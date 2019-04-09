const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

//This is where we set the view engine to ejs
app.set('view engine', 'ejs')

  const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (request, response) => {
  response.send("Hello!");
});

app.get("/urls", (request, response) => {
  let templateVars = {urls: urlDatabase}
  response.render('urls_index', templateVars);
});

app.get('/urls/:shortURL', (request, response) => {
  let templateVars = {shortURL: request.params.shortURL, longURL: urlDatabase };
  response.render('urls_show', templateVars)
});

app.get('/hello', (request, response) => {
  response.send('<html><h1>Hello World</h1></html>\n')
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});