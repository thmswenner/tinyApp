const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

//This is where we set the view engine to ejs
app.set('view engine', 'ejs')

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

  const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (request, response) => {
  response.send("Hello!");
});

app.get("/urls", (request, response) => {
  const templateVars = {urls: urlDatabase}
  response.render('urls_index', templateVars);
});

app.get('/urls/new', (request, response) => {
  response.render('urls_new');
});

app.get('/urls/:shortURL', (request, response) => {
  const templateVars = {shortURL: request.params.shortURL, longURL: urlDatabase[request.params.shortURL] };
  response.render('urls_show', templateVars)
});


app.get('/hello', (request, response) => {
  response.send('<html><h1>Hello World</h1></html>\n')
})

app.post('/urls', (request,response) => {
  const shortURL = generateRandomString()
  urlDatabase[shortURL] = request.body.longURL
  response.redirect(`/urls/${shortURL}`)
})

const generateRandomString = () => {
  let randomStr = "";
  const letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 6; i++)
    randomStr += letters.charAt(Math.floor(Math.random() * letters.length));

  return randomStr;
}

generateRandomString()

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});