const bodyParser = require('body-parser')

module.exports = function(app){
  app.set('port',process.env.PORT || 3001)

  app.set('db_protocol',process.env.DB_PROTOCOL || 'http://')
  app.set('db_host',process.env.DB_HOST || 'localhost')
  app.set('db_port',process.env.DB_PORT || 5984)
  app.set('db_username',process.env.DB_USERNAME || '531ff50310f6fb45cdf08bf1f1f8ece4')
  app.set('db_password',process.env.DB_PASSWORD || '8d2141ae0461ee6577986b8083249d60')

  app.use(bodyParser.json())
}