const express = require("express")
const app = express()
const morgan = require('morgan')
const PORT = 8080 // default port 8080
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
}

//Login
app.post('/login', (req, resp) => {
  resp.cookie('username', req.body.username)
  resp.redirect('/urls')
})

//Logout
app.post('/logout', (req, resp) => {
  console.log('Are you getting called?')
  resp.clearCookie('username')
  resp.redirect('/urls')
})

//Serves Homepage
app.get("/urls", (req, resp) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies["username"]
  }
  resp.render('urls_index', templateVars)
})

//serves create new page
app.get('/urls/new', (req, resp) => {
  const templateVars = {
    username: req.cookies["username"]
  }
  resp.render('urls_new', templateVars);
})

//serves shortURL page
app.get('/urls/:shortURL', (req, resp) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    username: req.cookies["username"]
  }
  resp.render('urls_show', templateVars);
})

//Delets URL
app.post('/urls/:shortURL/delete', (req, resp) => {
  delete urlDatabase[req.params.shortURL]
  resp.redirect('/urls')
})

//Adds random key to longURL
app.post('/urls', (req,resp) => {
  const shortURL = generateRandomString()
  urlDatabase[shortURL] = req.body.longURL
  resp.redirect(`/urls/${shortURL}`)
})

//Updates urlDatabase
app.post('/urls/:shortURL', (req, resp) => {
  console.log('Im Here')
  urlDatabase[req.params.shortURL] = req.body.longURL
  resp.redirect(`/urls/${req.params.shortURL}`)
})

app.get('/urls/:shortURL', (req, resp) => {
  resp.redirect(`/urls/${shortURL}`)
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