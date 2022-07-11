const path=require('path')
const express=require('express')
// const { dirname } = require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



const app=express()

// heroku setup
const port=process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


// setup handelbars and views location cause by default express searches in views folder but we have change to templates
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Yash Mishra'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About ME',
        name:'Yash Mishra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Yash Mishra',
        helpText:'This is some helpfull text ',
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address

            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        // using return cause we can send 1 req and only 1 res per http req
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Yash Mishra',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Yash Mishra',
        errorMessage:'Page not found'
    })
})
// for heroku we add port
app.listen(port,()=>{
    console.log('server is up on port'+port)
})



