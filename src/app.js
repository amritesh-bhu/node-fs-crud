import http from 'http'
import { writeContentToFile, writeContentToFileUsingPromise } from './routes/write-file.js'
import { appendingToFile, appendToFileUsingPromise } from './routes/append-to-file.js'



const httpServer = http.createServer((req, res) => {

    const { method, url } = req
    if (method === "POST" && url == '/write-file') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            console.log("consoling buffer data", body)
            const jsonData = JSON.parse(body)
            const resData = writeContentToFile(jsonData)
            res.end(JSON.stringify({ message: resData }))
        })
    } else if (method === "POST" && url == '/write-file-async') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const jsonData = JSON.parse(body)
            const resData = await writeContentToFileUsingPromise(jsonData)
            res.end(JSON.stringify({ message: resData }))
        })
    } else if (method === "POST" && url == '/append-file') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const jsonData = JSON.parse(body)
            const resData = appendingToFile(jsonData)
            res.end(JSON.stringify({ message: resData }))
        })
    } else if (method === 'POST' && url == '/append-file-async') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const jsonData = JSON.parse(body)
            const resData = appendToFileUsingPromise(jsonData)
            res.end({ message: resData })
        })
    }
})

httpServer.listen(8080, () => {
    console.log('Server is listening on port 8080')
})  