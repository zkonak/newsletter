/*
const express = require("express");
const  createMail  =require("./src/converter.js");


const server = express();
const port = 7576;
server.use(express.static("./src/mjml"));
// Start up
server.listen(port, (err) => {
  if(err){
    console.log('Email template server error! ' + err);
  }
  console.log("Email template server is listening on port " + port);
});

// Global setup
server.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Methods','GET,POST');
  res.set('Access-Control-Allow-Headers','Authorization, Content-Type, Origin, X-Requested-With, Accept');
  if('OPTIONS' == req.method) return res.sendStatus(200);
  next();
});*/
/*
server.post('*', function(req, res){ // Collect JSON data
  var data_string = '';
  req.on('data', function(data){
    data_string += data;
  });
  req.on('end', function(){ // When collection finishes
    try{
      var request_obj = JSON.parse(data_string);*/
   //   createMail("mjml-1-vue");
      /*.then(response=>{
        res.send(response);
      }).catch(response=>{
        res.status(500).end(response)
        return
      })*/
   /* }catch(e){
      res.status(500).end('Internal Server Error');
    }
  });
});*/


import express from  'express'
import Server from './src/config/server.js';
import Logger from './src/helpers/logger.js';
import winston from 'winston';
import config from './src/config/env.js';
import createMail from './src/views/createMail.js';
import getClusters from './src/data/getClusters.js';
const logger = new Logger(winston);
const application = new Server(express, null, logger);


(async () => {
    try {
       
        await application.listen(config.app_port);
        getClusters();
        let data={};
        data.text1="aa";
        data.text2="bb";
       // createMail(data);
    } catch (e) {
        console.error(e);
        logger.log('warn', e.message);
    }
})()