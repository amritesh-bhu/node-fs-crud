import http from 'http'
import { writeContentToFile, writeContentToFileUsingPromise } from './routes/write-file.js'
import { appendingToFile, appendToFileUsingPromise } from './routes/append-to-file.js'
import { readFromFile, readFromFileUsingPromise } from './routes/read-file.js'
import { deleteTheFile, deleteTheFileUsingPromise } from './routes/delete-file.js'



const httpServer = http.createServer(async (req, res) => {

    const { method, url } = req
    if (method === "POST" && url == '/write-file') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            const jsonData = JSON.parse(body)
            const resData = writeContentToFile(jsonData)
            console.log(resData)
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
        req.on('end', async () => {
            const jsonData = JSON.parse(body)
            const resData = await appendToFileUsingPromise(jsonData)
            console.log(resData)
            res.end(JSON.stringify({ message: resData }))
        })
    } else if (method === "GET" && url == "/read-file") {
        const data = readFromFile()
        res.end(JSON.stringify({ message: data }))
    } else if (method === "GET" && url == "/read-file-async") {
        const resData = await readFromFileUsingPromise()
        res.end(JSON.stringify({ message: "Data from xyz file are : ", data: resData }))
        req.on('error', err => {
            console.error('Error:', err);
            res.statusCode = 500;
            res.end('Something went wrong');
        });
    } else if (method === "DELETE" && url == "/delete-file") {
        deleteTheFile()
        res.end('File deleted successfully!!!')
    }
    else if (method === "DELETE" && url == "/delete-file-async") {
        const msg = await deleteTheFileUsingPromise()
        res.end(msg)
        req.on('error', err => {
            console.error('Error:', err);
            res.statusCode = 500;
            res.end('Something went wrong');
        });
    }
})

httpServer.listen(8080, () => {
    console.log('Server is listening on port 8080')
})  