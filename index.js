'use strict';

const path = require('path');

const express = require('express');
const app = express();

const {port,host,storage} = require('./gameServerConfig.json');

const Datastorage = require(path.join(__dirname,storage.storageFolder,storage.dataLayer));

const dataStorage=new Datastorage();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'pages'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

const homePath=path.join(__dirname,'home.html');

app.get('/', (req,res)=>res.sendFile(homePath));

app.get('/all', (req,res)=>
    dataStorage.getAll().then(data=>res.render('allGames',{result:data}))
);

app.get('/getgame', (req, res) =>
res.render('getgame', {
    title: 'Get',
    header1: 'Get Info',
    action: '/getgame'
}));

app.post('/getgame', (req, res) => {
    if(!req.body) return res.sendStatus(500);

    const gameId = req.body.number;
    dataStorage.getOne(gameId)
    .then(game=>res.render('gamePage', {result:game}))
    .catch(error=>sendErrorPage(res, error));

});

app.get('/inputgame', (req,res) => 
res.render('form',{
    title: 'Add Game',
    header1: 'Add a new game',
    action: '/input',
    number: {value:'', readonly:''},
    name: {value:'', readonly:''},
    quantity: {value:'', readonly:''},
    genre: {value:'', readonly:''},
    rating: {value:'', readonly:''}
}));

app.post('/input', (req, res)=>{ 
if(!req.body) return res.statusCode(500);

dataStorage.insert(req.body)
.then(status=>sendStatusPage(res,status))
.catch(error=>sendErrorPage(res,error))
});

app.get('/updategame', (req, res) => 
res.render('form',{
    title: 'Update game',
    header1: 'Update Info',
    action: '/updatedata',
    number: {value:'', readonly:''},
    name: {value:'', readonly:'readonly'},
    quantity: {value:'', readonly:'readonly'},
    genre: {value:'', readonly:'readonly'},
    rating: {value:'', readonly:'readonly'}
}));

app.post('/updatedata', (req, res)=>{ 
    if(!req.body) return res.sendStatus(500);
    dataStorage.getOne(req.body.number)
    .then(game=>
    res.render('form',{
        title: 'Update game',
        header1: 'Update Info',
        action: '/update',
        number: {value: game.number, readonly:'readonly'},
        name: {value: game.name, readonly:''},
        quantity: {value: game.quantity, readonly:''},
        genre: {value: game.genre, readonly:''},
        rating: {value: game.rating, readonly:''}
    })
    )
    .catch(error=>sendErrorPage(res,error));
});

app.post('/update', (req, res)=>{ 
    if(!req.body) return res.statusCode(500);

    dataStorage.update(req.body)
    .then(status=>sendStatusPage(res,status))
    .catch(error=>sendErrorPage(res,error))
});

app.get('/removegame', (req, res) =>
res.render('getgame', {
    title: 'Remove',
    header1: 'Remove Game',
    action: '/removegame'
}));

app.post('/removegame', (req, res) => {
    if(!req.body) return res.sendStatus(500);

    const gameId = req.body.number;
    dataStorage.remove(gameId)
    .then(status=>sendErrorPage(res, status))
    .catch(error=>sendErrorPage(res, error));

});

app.listen(port,host, ()=>console.log(`Server ${host}:${port} listening...`));

function sendErrorPage(res, error, title='Error', header1 = 'Error'){
    sendStatusPage(res,error,title,header1);
}

function sendStatusPage(res, status,title='Status', header1='Status'){ 
return res.render('statusPage', {title,header1,status});
}



