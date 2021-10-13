import dotenv from 'dotenv';
dotenv.config();

const config = {
    app_port: process.env.APP_PORT,
    prometheus_url:process.env.prometheus_url
   
}

export default config;