const express = require('express')
const app = express()
const port = 3000

const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const { authentication, authorization } = require('./middleware/authentication')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/users', userRoutes)
app.use('/blogs', authentication, blogRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})