import http from 'node:http';

const server = http.createServer((request, response) => {
    console.log('server is running...')
    return response.end('Hello World...')
})

server.listen(3333)

