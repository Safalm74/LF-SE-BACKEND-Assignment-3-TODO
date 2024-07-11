import config from './config';
import express from 'express';
import Router from './routes/'; //index router 
import { genericErrorHandler, notFoundError } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';

const app = express();

//Middleware to parse incoming requests with JSON payload
app.use(express.json()); 

//Middleware to log
app.use (requestLogger);

//use main router
app.use(Router); 

//Middleware to handle errors
app.use (genericErrorHandler);

//Middleware to handle if route requested is not found
app.use (notFoundError);

//server port,defaulting to port 8000 if not specified
const serverPort=config.port?config.port:8000

//listening on server port
app.listen(
    serverPort,
    ()=>{
        console.log(`Listening in port ${serverPort} `)
    }
);
