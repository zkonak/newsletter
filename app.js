import express from  'express'
import Server from './src/config/server.js';
import Logger from './src/helpers/logger.js';
import winston from 'winston';
import config from './src/config/env.js';
import createMail from './src/views/createMail.js';
import sendMail from './src/views/createMail.js';
import Utils from './src/data/Utils.js';
import createData from './src/data/createData.js';
import createScores from './src/data/createScores.js';
import cron from 'node-cron';
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
       
         const date = new Date();
         date.setDate(date.getDate() - 1);
         const date2= new Date();
         date2.setDate(date2.getDate() - 30);
         //RFC 3339 format
         const formattedDate = date.toISOString();
         const formattedDate2 = date2.toISOString();

        
        //clusters.forEach(element => {
         let tenant= await Utils.getTenant('admin-hprd.caas.cagip.group.gca')
         let data1=await createData("'admin-hprd.caas.cagip.group.gca'","'"+tenant+"'",formattedDate,logger);
         let data2=await createData("'hprd.caas.caa.group.gca'","'"+tenant+"'",formattedDate2,logger);
         let dataScores= createScores(data1,data2);
         console.log(data1);
         console.log(data2);
         console.log(formattedDate);
         console.log(formattedDate2);
         //data.clusterName="CATS";

         //let html_mail=await createMail(data,logger);
         //console.log('html-mail',html_mail);
        // await sendMail(html_mail,"'admin-hprd.caas.cagip.group.gca'",logger);


     // });
    } catch (e) {
        console.error(e);
        logger.log('warn', e.message);
    }
    
})()