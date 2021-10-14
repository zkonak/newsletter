import fetch from 'node-fetch';
//import config from '../config/env.js';


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const getClusters=async ()=>{
//clusters
const response=await fetch(process.env.PROMETHEUS_URL+'label/cluster/values');
const body=await response.json();



if (body.status=="success"){
   
   return body.data;
  
}




}

export default getClusters;