import http from 'node:http';

const users = [];

const server = http.createServer((request, response) => {
    console.log('server is running...')
    const { method, url } = request;
    console.log(method, url)

    if (method === 'GET' && url == '/users') {
        return response.end(JSON.stringify(users))
    }

    if (method == 'POST' && url == '/users') {
        users.push({
            name: 'John doe',
            email: 'johndoe@example.com',
            id: 1,
        })
        return response.writeHead(201).end()
    }

    return response.writeHead(404).end('Not found')
})

server.listen(3333)

