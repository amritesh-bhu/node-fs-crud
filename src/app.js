import http from 'http'

const httpServer = http.createServer()


httpServer.listen(8080, () => {
    console.log('Server is listening on port 8080')
})