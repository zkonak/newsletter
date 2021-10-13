import fetch from 'node-fetch';
import config from '../config/env.js';
import Logger from '../helpers/logger.js'
const logger = new Logger(winston);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const getClusters=async ()=>{
//clusters
const response=await fetch(config.prometheus_url+'/api/v1/label/cluster/values');
const body=await response.json();



if (body.status=="success"){
   
   return body.data;
  
}else{
    logger;log("warn", "Cannot find cluster");     

}




}

export default getClusters;