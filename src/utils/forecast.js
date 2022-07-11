const request=require('request')

const forecast=( latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=16feceef5dfbecdc1059e9bdd965396d&query=' + latitude+ ',' + longitude +'&unit=m'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to Location Services',undefined)

        }
        else if(response.body.error){
            callback('Unable to find Location!')
        }
        else{
            callback(undefined,'It is currently '+ response.body.current.temperature + ' degrees out.'+ 'It feels like '+response.body.current.feelslike + ' degrees out.There is a '+ response.body.current.precip+'% chance of rain')
        }
    })
}

module.exports=forecast