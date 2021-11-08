import express from  'express'
import Server from './src/config/server.js';
import Logger from './src/helpers/logger.js';
import winston from 'winston';
import config from './src/config/env.js';
import createMail from './src/views/createMail.js';
import sendMail from './src/views/createMail.js';
import getClusters from './src/data/getClusters.js';
import createData from './src/data/createData.js';
import cron from 'node-cron';
const logger = new Logger(winston);
const application = new Server(express, null, logger);


(async () => {
    try {
       
        await application.listen(process.env.APP_PORT);
     
        //for
       //  cron.schedule('* * * * *', () => {logger.log('warn',"Task is running every minute " + new Date())});
         let clusters=getClusters();
         const date = new Date();
         date.setDate(date.getDate() - 1);
         const date2= new Date();
         date2.setDate(date2.getDate() - 30);
         //RFC 3339 format
         const formattedDate = date.toISOString();
         const formattedDate2 = date2.toISOString();

         console.log(formattedDate,formattedDate2);
        //clusters.forEach(element => {
         let data=await createData("'admin-hprd.caas.cagip.group.gca'",formattedDate1,formattedDate2,logger);;
         data.clusterName="CATS";
         let html_mail=await createMail(data,logger);
         //console.log('html-mail',html_mail);
        // await sendMail(html_mail,"'admin-hprd.caas.cagip.group.gca'",logger);


     // });
    } catch (e) {
        console.error(e);
        logger.log('warn', e.message);
    }
    
})()