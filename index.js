const express = require('express')
const app = express()

/* config */
require('./app/config')(app)

/* routes */
require('./app/routes')(app)

/* public folder */
app.use('/',express.static('dist'))

app.listen(app.get('port'),()=>{
  console.log(`app listening on port ${app.get('port')}`)
})