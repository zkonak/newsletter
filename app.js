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
        //clusters.forEach(element => {
         let data=await createData("'admin-hprd.caas.cagip.group.gca'","2021-10-13T20:10:51.781Z",logger);;
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