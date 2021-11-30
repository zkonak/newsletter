import express from  'express'
import Server from './src/config/server.js';
import Logger from './src/helpers/logger.js';
import winston from 'winston';
import config from './src/config/env.js';
import createMail from './src/views/createMail.js';
import sendMail from './src/views/createMail.js';
import Utils from './src/data/Utils.js';
import createData from './src/data/createData.js';
import init from './src/data/start.js';
import getRandomQuote from './src/data/createQuote.js';
import createScores from './src/data/createScores.js';
import cron from 'node-cron';
import fs from  'fs';

const logger = new Logger(winston);
const application = new Server(express, null, logger);

(async () => {
  try {
     await application.listen(process.env.APP_PORT);

    //  cron.schedule('* * * * *', () => {logger.log('warn',"Task is running every minute " + new Date())});
    // get list of clusters
    const clusters = await Utils.getClusters();
    // get a Quote
    const randomQuote = getRandomQuote()
    // dates
    const dateRecent = new Date()
    dateRecent.setDate(dateRecent.getDate() - 1)
    const datePrevious = new Date()
    datePrevious.setDate(datePrevious.getDate() - 30)
    // RFC 3339 format
    const formattedDate = dateRecent.toISOString()
    const formattedDatePrev = datePrevious.toISOString()

    // clusters.forEach(element => {

     init(clusters[5], formattedDate, formattedDatePrev, randomQuote, logger)

    // });
  } catch (e) {
    console.error(e)
    logger.log('warn', e.message)
  }
})()
