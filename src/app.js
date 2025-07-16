import http from 'http'
import { writeContentToFileUsingCallback, writeContentToFileUsingPromise } from './routes/write-file.js'



const httpServer = http.createServer((req, res) => {

    const { method, url } = req
    if (method === "GET" && url == '/writefile') {
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
            const jsonData = JSON.parse(body)
            const resData = writeContentToFileUsingPromise(jsonData)
            res.end(JSON.stringify({ message: "writting file using promise!!", data: resData}))
        })
    }
})

httpServer.listen(8080, () => {
    console.log('Server is listening on port 8080')
})  