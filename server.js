const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
const port= process.env.PORT||3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err)
            {
                console.log('Unable to write data in server.log file');
            }
    })
    next();
})



hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(message)=>{
    return message.toUpperCase();
})

app.get('/',function(req,res){
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage: 'welcome to home of this awesome websites'
    });
});

app.get('/about',function(req,res){
    res.render('about.hbs',{
        pageTitle:'about page',
    });
});

app.get('/project',function(req,res){
    res.render('project.hbs',{
         pageTitle:'Project page',
         welcomeMessage:"welcome to projects page"
    })
})



app.listen(port,function(){
    console.log(`server is up and running on port ${port}`);
});