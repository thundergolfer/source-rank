const express = require( 'express' );
const path = require( 'path' );
var proxy = require( 'http-proxy-middleware' );

const port = process.env.PORT || 3000;
const app = express();

// serve static assets normally
app.use( express.static( `${__dirname}/dist` ));

// Handles all routes so you do not get a not found error
app.get( '/', ( request, response ) => {
    response.sendFile( path.resolve( __dirname, 'dist', 'index.html' ));
});

app.use( '/api/', proxy({ target: 'http://localhost:5000', changeOrigin: true }));

app.listen( port );
console.log( `server started on port ${port}` );
