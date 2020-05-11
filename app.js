const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const loginStatus = require('./login')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  const results = loginStatus(req.body)
  const email = req.body.email
  if (results === 'Please enter your information' || results === 'Incorrect Email or Password') {
    res.render('index', { results: results, email: email })
  } else {
    res.render('success', { results: results })
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})