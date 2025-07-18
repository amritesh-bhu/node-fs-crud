import fs from 'fs'
import { abcFile } from '../utils/constant.js'

// Writting a file using callback, This approach is not feasible to return something from here because 
// the function return the value before the file operation is done because file operation is an asynchronous operation 
// and you can't return the data you are reading from the file!!.

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