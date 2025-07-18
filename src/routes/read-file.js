import fs from 'fs'
import { abcFile, xyzFile } from '../utils/constant.js'

// Writting a file using callback, This approach is not feasible to return something from here because 
// the function return the value before the file operation is done because file operation is an asynchronous operation 
// and you can't return the data you are reading from the file!!.you can return the data from here only 
// when you are paasing res object to the route layer to sent back the data . 

export const readFromFile = () => {
    const readingFromfileAsync = (callback) => {
        fs.readFile(abcFile, 'utf8', (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
    }

    readingFromfileAsync((err, data) => {
        if (err) {
            console.error(err)
        } else {
            console.log(data)
        }
    })

    return 'Data has been read successfully!!!'
}


export const readFromFileUsingPromise = async () => {
    const readingFromfileAsync = () => {
        return new Promise((resolve, reject) => {
            fs.readFile(xyzFile, 'utf-8', (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    try {
        const data = await readingFromfileAsync()
        return data
    } catch (err) {
        return err
    }
}