const express = require("express")
const app = express()
const  morgan = require('morgan')
const PORT = 8080 // default port 8080
const bodyParser = require("body-parser")


app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
}

//Serves Homepage
app.get("/urls", (req, res) => {
  const templateVars = {
    urls: urlDatabase
  }
  res.render('urls_index', templateVars)
})

//serves create new page
app.get('/urls/new', (req, res) => {
  res.render('urls_new');
})

//serves shortURL page
app.get('/urls/:shortURL', (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
  }
  res.render('urls_show', templateVars);
})

//Delets URL
app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL]
  res.redirect('/urls')
})

//Adds random key to longURL
app.post('/urls', (req,res) => {
  const shortURL = generateRandomString()
  urlDatabase[shortURL] = req.body.longURL
  res.redirect(`/urls/${shortURL}`)
})


//Updates urlDatabase
app.post('/urls/:shortURL', (req, res) => {
  console.log('Im Here')
  urlDatabase[req.params.shortURL] = req.body.longURL
  res.redirect(`/urls/${req.params.shortURL}`)
})

app.get('/urls/:shortURL', (req, res) => {
  res.redirect(`/urls/${shortURL}`)
})

//Function to create a random 6 digit string

const generateRandomString = () => {
  let randomStr = ""
  const letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  for (var i = 0; i < 6; i++)
    randomStr += letters.charAt(Math.floor(Math.random() * letters.length))

  return randomStr
}

generateRandomString()


//listens for whatever the PORT is
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})