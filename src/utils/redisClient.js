/*
   Openning connection with redis on port 6379
*/
"use strict";

const redis = require('redis'),
    redisClient = redis.createClient();

redisClient
    .on('connect', function() {
        console.log('Conectado a Redis Server'.red);
    })
    .on('error', (err) => {
        console.error('Error', err);
    })

module.exports = redisClient;

//Redis 3.2.100 (00000000/0) 64 bit

//Running in standalone mode
//Port: 6379
//PID: 11712
//http://redis.io
