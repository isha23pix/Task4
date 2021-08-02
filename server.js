const express = require('express');
const sendMail=require('./mail.js');
const Datastore= require('nedb');
const sev= express();
const path=require('path');
const PORT=8080;


const database= new Datastore('data.db');
database.loadDatabase();



sev.use(express.urlencoded({
    extended: false
}));
sev.use(express.json());

sev.post('/email',(req,res)=>{
    const {subject,email,text}=req.body;
    console.log('Data:',req.body);
    database.insert(req.body);
    sendMail(email, subject, text,function(error,data){
        if (error){
            res.sendStatus(500).json({message: 'Internal Error Found'});
        }
        else{
            res.json({message:'Sent Mail'});
        }
    });
});


sev.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
});

sev.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname +'/error.html'));
});
sev.get('/email/sent', (req, res) => {
    res.sendFile(path.join(__dirname +'/success.html'));
});

sev.listen(PORT,()=>{
    console.log('Server is starting on PORT:',8080);
});