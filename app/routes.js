module.exports = function(app){
  
  const dbInterface = require('./db')(app)

  // app.get('/',(req,res)=>{
  //   res.sendStatus(200)
  // })

  app.post('/newDataPoint',(req,res)=>{
    dbInterface.newEvent(req.body)
      .then(m=>res.status(200).send(JSON.stringify(m)))
      .catch(e=>res.status(500).send(e))
  })

  app.get('/initGetData',(req,res)=>{
    console.log('initGetData')
    dbInterface.initGetData()
      .then(rows=>res.send(JSON.stringify(rows)))
      .catch(e=>res.send(e).send(500))
  })
}