const express = require('express')
// const path = require('path')
// const serveStatic = require('serve-static')

const app = express()
app.use(express.static(__dirname + '/dist/'))
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log('Application running on PORT:', PORT)
})
