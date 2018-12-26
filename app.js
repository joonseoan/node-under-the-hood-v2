const http = require('http');
const fs = require('fs');
// 1 Way of legacy 1
// Whenever the user accesses the server, 'create server'
// the server will run the function below.
// function reqListener(req, res) {
//     console.log('ddd');
// }

// arguments: request and response
// Argument is 'callback'
// http.createServer(reqListener);

// 2 Way of Legay 2
// By using anonymous funciton
// http.createServer(function(reg, res) {});

// 3 Way of new version
// By using arrow funciton.
// http.createServer((req, res) => {

//     console.log(req);

// });

// ********** 'createServer' returns 'Server'
// Please hover over 'creaateServer' to find the syntax
// Therefore, 
const server = http.createServer((req, res) => {

    // request from the client
    /*
    
        // console.log(req);
        // information about meta data
        // browser type, os type of the users
        console.log('req.headers: ', req.headers);
        
        // url about where the users access to
        // '/', and '/ test'
        console.log('req.url: ', req.url);

        // restful ; get, post and etc
        console.log('req.method: ', req.method);
        
        // when the client accesses to the server,
        // and after the server finishes the registered functions
        //  the server exits.
        // process.exit();
    
    */

    // response from the server

    /*
    
    
    */

    const url = req.url;
    const method = req.method;

    if(url === '/') {

        // action: when the client submits the form below, 
        //      some action is kicking in '/message' url which is automatically redirected
        // method: When the user posts/sends some data to the client
        res.write(`<html>
            <head><title>Enter Message</title></head>
            <body>
                <form action='/message' method='POST'>
                    <label>Enter a message here: </label>
                    <input type='text'name='message'></input>
                    <button type='submit'>SEND</button>
                </form>
            <body>
        </html>`);

        // It will makes the running code stop.
        // 'res.end()' includesthe statusCode; 200.
        // Then, stop executing the codes down below.
        // console.log(res.end());
        return res.end();
    }

    if(url === '/message' && method === 'POST') {

        // because streaming-in data is comming in in a unit of 'chunk' 
        const body = [];

        // event listener 'data'
        // listening to data from the client
        req.on('data', (chunk) => {
            console.log('chunk: ', chunk);
            body.push(chunk);
            console.log('body: ', body);
        });

        // event listener 'end'
        // When all data came in 'body' array as up and above
        // finsh parsing data
        // 'return' here is really important.
        // The error below is caused by res.setHeader('Location', '/');
        // 
        // without return, an error ocurrs because the server running is done all the way
        //   before this callback is fully executed.
            // {
                // throw new ERR_HTTP_HEADERS_SENT('set');
                // ^
            
                // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                //     at ServerResponse.setHeader (_http_outgoing.js:470:11)
                //     at IncomingMessage.req.on (C:\Users\Acer\OneDrive\myApps\node\2ndPhase\startingNode\app.js:117:17)
                //     at IncomingMessage.emit (events.js:182:13)
                //     at endReadableNT (_stream_readable.js:1094:12)
                //     at process._tickCallback (internal/process/next_tick.js:63:19) 
            // }
        //  req.on('end', () => { ==> XXXX
        return req.on('end', () => {

            // Define Buffer to read data in the array
            // Buffer is an array. Buffer stores data in a unit of array..
            // toString() => to switch chunk to readeable string
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsedBody', parsedBody);

            const message = parsedBody.split('=')[1];

            // Chaning Async
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, (err) => {

                // in this case, err is ignored.

                // a field of http headers
                res.statusCode = 302;
        
                // Relocate 
                res.setHeader('Location', '/');
    
                // It is just for return of req.on('end', () => {})
                // It does not stop function  
                return res.end();      
                  
            });
        });

    }

    // First Args : a key about what browser in the client are accepting 
    // Second Args : a value of the contents
    res.setHeader('Content-Type', 'text/html');

    // it should be a body.
    res.write(`<html>
        <head><title>Starting Node</title></head>
        <body>
            <h1>Hello, Node!!!</h1>
        <body>
    </html>`);

    // We cannot write any further response after res.end().
    res.end();

});

// Then we need to create listener to get request from the client
server.listen(3000);

