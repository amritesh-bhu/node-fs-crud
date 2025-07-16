import http from 'http'
import { writeContentToFileUsingCallback } from './routes/write-file.js'



const httpServer = http.createServer((req, res) => {

    const { method, url } = req
    if (method === "GET" && url == '/writefile') {
        // console.log("getting the request from postman client!!")
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            console.log("consoling buffer data", body)
            const jsonData = JSON.parse(body)
            const resData = writeContentToFileUsingCallback(jsonData)
            res.end(JSON.stringify({ message: "Message received", resData }))
        })
    } else if (method === "GET" && url == '/write-file-async') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            console.log("consoling the buffer data", body)
            const jsonData = JSON.parse(body)
            res.end(JSON.stringify({ message: "writting file using promise!!", data: jsonData }))
        })
    }
})

httpServer.listen(8080, () => {
    console.log('Server is listening on port 8080')
})  