import express from  'express'
import Server from './src/config/server.js';
import Logger from './src/helpers/logger.js';
import winston from 'winston';
import config from './src/config/env.js';
import createMail from './src/views/createMail.js';
import sendMail from './src/views/createMail.js';
import Utils from './src/data/Utils.js';
import createData from './src/data/createData.js';
import getRandomQuote from './src/data/createQuote.js';
import createScores from './src/data/createScores.js';
import cron from 'node-cron';
import fs from  'fs';
const logger = new Logger(winston);
const application = new Server(express, null, logger);
/*

FROM node:14.18-alpine
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm i
EXPOSE 8080
CMD ["node","app.js"]
*/ 

(async () => {
    try {
       
        await application.listen(process.env.APP_PORT);
     

       //  cron.schedule('* * * * *', () => {logger.log('warn',"Task is running every minute " + new Date())});
         let clusters=Utils.getClusters();
         let randomQuote=getRandomQuote();
         const date = new Date();
         date.setDate(date.getDate() - 1);
         const date2= new Date();
         date2.setDate(date2.getDate() - 30);
         //RFC 3339 format
         const formattedDate = date.toISOString();
         const formattedDate2 = date2.toISOString();

         
        //clusters.forEach(element => {
         let returnObject= await Utils.getTenant('admin-hprd.caas.cagip.group.gca');
         let data1=await createData("'admin-hprd.caas.cagip.group.gca'","'"+returnObject.tenant+"'",formattedDate,logger);
         let data2=await createData("'hprd.caas.caa.group.gca'","'"+returnObject.tenant+"'",formattedDate2,logger);
         let dataScores=await createScores(data1,data2);
         console.log(data1);
         console.log(data2);
         console.log(formattedDate);
         console.log(formattedDate2);
         console.log(dataScores);
         data1.clusterName="admin-hprd.caas.cagip.group.gca";
         data1.TX_KUBERNETES_PROJET=returnObject.numberOfProjects;
         let html_mail=await createMail(data1,dataScores,randomQuote,logger);
         //console.log('html-mail',html_mail);
        // await sendMail(html_mail,"'admin-hprd.caas.cagip.group.gca'",logger);
       
         fs.writeFile('./my-page.html', html_mail, (error) => { console.log(error) });

     // });
    } catch (e) {
        console.error(e);
        logger.log('warn', e.message);
    }
    
})()