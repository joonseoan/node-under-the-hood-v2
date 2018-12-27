const fs = require('fs');

const requestHandler = (req, res) => {

    const { url, method } = req;

    if(url === '/') {
    
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
    
        return res.end();
    }
    
    if(url === '/message' && method === 'POST') {
    
        const body = [];
    
        req.on('data', (chunk) => {
            body.push(chunk);
        });
    
        return req.on('end', () => {
    
            const parsedBody = Buffer.concat(body).toString();
    
            const message = parsedBody.split('=')[1];
        
            fs.writeFile('message.txt', message, (err) => {
                console.log('ddd');
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();       
            });
        });
    
    }

    res.setHeader('Content-Type', 'text/html');    
    res.write(`<html>
        <head><title>Starting Node</title></head>
        <body>
            <h1>Hello, Node!!!</h1>
        <body>
    </html>`);
    res.end();
}

module.exports = requestHandler;
