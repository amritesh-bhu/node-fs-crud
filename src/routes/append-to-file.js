import fs from "fs"
import { abcFile, xyzFile } from "../utils/constant.js"

// Writting a file using callback, This approach is not feasible to return something from here because 
// the function return the value before the file operation is done because file operation is an asynchronous operation.
export const appendingToFile = (jsonData) => {

    const jsonString = JSON.stringify(jsonData)
    const appendingToFileAsync = (callback) => {
        fs.appendFile(abcFile, `\n${jsonString}`, (err) => {
            if (err) callback(err, null)
            callback(null, "data appended to the file successfully!!")
        })
    }

    appendingToFileAsync((err, message) => {
        if (err) {
            console.error(err)
        }
    })

    return "data appended to the file successfully!!"
}



export const appendToFileUsingPromise = async (jsonData) => {
    const jsonString = JSON.stringify(jsonData)
    const appendToFileAsync = () => {
        return new Promise((resolve, reject) => {
            fs.appendFile(xyzFile, `\n${jsonString}`, (err) => {
                if (err) reject(err)
                resolve('appended content successfully!!!')
            })
        })
    }

    try {
        const data = await appendToFileAsync()
        return data
    } catch (error) {
        console.log(error)
    }
} 