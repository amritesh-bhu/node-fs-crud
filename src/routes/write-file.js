import fs from "fs"
import { path } from "../utils/constant.js"

// Writting a file using callback, This approach is not feasible to return something from here because 
// the function return the value before the file operation is done because file operation is an asynchronous operation.
export const writeContentToFile = async (jsonData) => {

    const { filename, content } = jsonData

    const jsonString = JSON.stringify(content)
    const writeFileAsync = (callback) => {
        fs.writeFile(`${path}/${filename}`, jsonString, (err) => {
            if (err) callback(err, null)
            callback(null, 'file created or if already exist overwritten!!')
        })
    }

    writeFileAsync((err, message) => {
        console.log('message', message)
        if (err) return console.error(err)
    })

    return 'file created or if already exist overwritten!!'
}

export const writeContentToFileUsingPromise = async (jsonData) => {
    const { filename, content } = jsonData

    const jsonString = JSON.stringify(content)
    const writeFileAsync = () => {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${path}/${filename}`, jsonString, (err) => {
                if (err) reject(err)
                resolve("file created or overwritten successfully!!!")
            })
        })
    }

    try {
        const data = await writeFileAsync()
        return data
    } catch (error) {
        return console.error('write to file using asnc failed ', error)
    }

}
