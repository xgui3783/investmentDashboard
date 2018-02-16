const fetch = require('node-fetch')


const dbExist = (url) => new Promise((resolve,reject)=>{
  fetch(url)
    .then(r=>r.json())
    .then(json=>{
      if(json.error){
        if(json.error=='not_found'){
          fetch(url,{
            method : 'PUT'
          })
            .then(r=>r.json())
            .then(json=>{
              if(json.ok){
                resolve('event db created')
              }else{
                reject(json)
              }
            })
        }else{
          reject(json)
        }
      }else{
        resolve('event db exists')
      }
    })
})


const dbInterface = (app) => {
  
  const dbUrl = app.get('db_protocol') + 
  app.get('db_username') + ':' +
  app.get('db_password') + '@' +
  app.get('db_host') + ':' +
  app.get('db_port')

  const dbEventUrl = dbUrl + '/events'

  /* check if db is online */
  fetch(dbUrl)
    .then(r=>r.json())
    .then(json=>{
      if(json.error){
        console.warn(json.error)
      }
    })
    .catch(console.warn)
  
  /* check event db exists. if not, create it */
  dbExist(dbEventUrl)
    .then(console.log)
    .catch(console.warn)
    
  return ({
    newEvent : function(body){
      console.log(body)
      const storedObj = {
        date : Date.now(),
        name : body.payload.name,
        method : body.method,
        price : body.payload.price ? body.payload.price : '',
        volume : body.payload.volume ? body.payload.volume : ''
      }
      return new Promise((resolve,reject)=>{
        fetch(dbEventUrl+'/'+storedObj.date,{
          method : 'PUT',
          body : JSON.stringify(storedObj)
        })
          .then(r=>r.json())
          .then(json=>{
            if(json.ok){
              resolve(storedObj)
            }else{
              reject(json.error)
            }
          })
          .catch(e=>reject(e))
      })
      
    },
    calcYield : function(fromDate,toDate,id){

    }
})}

module.exports = dbInterface