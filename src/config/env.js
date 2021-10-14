import dotenv from 'dotenv';
const config=dotenv.config();
/*
const config = {
    app_port: process.env.APP_PORT,
    prometheus_url:process.env.PROMETHEUS_URL,
    tx_worker_number:process.env.TX_WORKER_NUMBER,
   
}*/

export default config;