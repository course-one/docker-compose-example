const express = require( "express" );
const axios = require( "axios" );
const redis = require( "redis" );

// create redis client
const redisClient = redis.createClient( "redis://redis-server:6379" );
redisClient.on( 'error', ( error ) => {
    console.log( '[BACKEND]: redis connection error', error );
} );

// create express app
const app = express();

// send a list of users
app.get( '/users', ( req, res ) => {
    redisClient.get( 'users', ( error, users ) => {
        if( error ) {
            console.log( '[BACKEND]: redis get error', error );
        } else if( users ) {
            res.json( JSON.parse( users ) ); // send response
            console.log( '[BACKEND]: sent response from cache' );
        } else {
            axios.get( 'https://jsonplaceholder.typicode.com/users' ).then( ( response ) => {
                setTimeout( () => {
                    redisClient.set( 'users', JSON.stringify( response.data ), ( error ) => {
                        if( error ) {
                            console.log( '[BACKEND]: redis get error', error );
                        } else {
                            res.json( response.data ); // send response
                            console.log( '[BACKEND]: sent response from API' );
                        }
                    } );
                }, 5000 ); // 5s intentional delay
            } ).catch( ( error ) => {
                console.log( '[BACKEND]: jsonplaceholder fetch error', error );
            } );
        }
    } );
} );

// start server on user-defined port
app.listen( process.env.SERVER_PORT, () => {
    console.log( '[BACKEND]: server start on port', process.env.SERVER_PORT );
} );
