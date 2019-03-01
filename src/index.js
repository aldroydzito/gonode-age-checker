const express = require('express')
const app = express()

const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

/**
 * Routes
 */

const checkAge = (req, res, next) => {
  if (!req.body.age || req.body.age < 1) return res.redirect('/')
  next()
}

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/check', checkAge, (req, res) => {
  const { age } = req.body
  return req.body.age > 17
    ? res.render('major', { age })
    : res.render('minor', { age })
})

app.listen(3000)
