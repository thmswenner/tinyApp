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



//Databases
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
}



const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
}


//Registration
app.get('/urls/register', (req, resp) => {
  let email = ''
  if (users[req.cookies.user]) {
    email = users[req.cookies.user].email
  }
  const templateVars = {
    email: email
  }
  resp.render('register', templateVars)
})



//Creating new user object
app.post('/register', (req, resp) => {
  const userId = generateRandomString()
  if(req.body.email === '' || req.body.password === '') {
    resp.sendStatus(400)
  } else if (findEmail(req.body.email)) {
    resp.sendStatus(400)
  } else {
    users[userId] = {
      id: userId,
      email: req.body.email,
      password: req.body.password
    }
    resp.cookie('user', userId)
    resp.redirect('/urls')
  }
})



//Login
app.get('/urls/login', (req, resp) => {
    let email = ''
  if (users[req.cookies.user]) {
    email = users[req.cookies.user].email
  }
  const templateVars = {
    email: email
  }
  resp.render('login', templateVars)
})

app.post('/login', (req, resp) => {
  if (!findEmail(req.body.email)) {
    resp.sendStatus(403)
  } else if (findEmail(req.body.email) && !findPassword(req.body.password)) {
    resp.sendStatus(403)
  } else {
    const id = Object.keys(users).find(key => users[key].email === req.body.email);
    console.log(id)
    resp.cookie('user', id)
    resp.redirect('/urls')
  }
})


//Logout
app.post('/logout', (req, resp) => {
  resp.clearCookie('user')
  resp.redirect('/urls')
})



//Serves Homepage
app.get('/urls', (req, resp) => {
  let email = ''
  if (users[req.cookies.user]) {
    email = users[req.cookies.user].email
  }
  const templateVars = {
    urls: urlDatabase,
    email: email
  }
  resp.render('urls_index', templateVars)
})



//Serves create new page
app.get('/urls/new', (req, resp) => {
  let email = ''
  if (users[req.cookies.user]) {
    email = users[req.cookies.user].email
  }
  const templateVars = {
    urls: urlDatabase,
    email: email
  }
  resp.render('urls_new', templateVars);
})



//Serves shortURL page
app.get('/urls/:shortURL', (req, resp) => {
    const email = ''
  if (users[req.cookies.user]) {
    email = users[req.cookies.user].email
  }
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    email: email
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
  urlDatabase[req.params.shortURL] = req.body.longURL
  resp.redirect(`/urls/${req.params.shortURL}`)
})



app.get('/urls/:shortURL', (req, resp) => {
  resp.redirect(`/urls/${shortURL}`)
})



//******  HELPER FUNCTIONS HERE  //

//Function to create a random 6 digit string
const generateRandomString = () => {
  let randomStr = ""
  const letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  for (var i = 0; i < 6; i++)
    randomStr += letters.charAt(Math.floor(Math.random() * letters.length))

  return randomStr
}

generateRandomString()


//Function to iterate through database object
const findEmail = (email) => {
  return Object.values(users).some(user => {
    return user.email === email
  })
}

const findPassword = (password) => {
  return Object.values(users).some(user => {
    return user.password === password;
  })
}



//listens for whatever the PORT is
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})