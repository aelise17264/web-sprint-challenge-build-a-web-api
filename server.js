const express = require('express')
const projectRouter = require('./routers/project-router')
const server = express()

server.use(express.json())

function logger(req, res, next) {
    console.log(  `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('host')}`	  );
   //res.status(200).json();
   next();
          }

server.use(logger)
server.use('/api/projects', projectRouter)

server.get('/', (req, res) => {
res.send(`<h2>Sprint Away!</h2>`);
});
          
          
module.exports = server;
          