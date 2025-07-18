import fs from 'fs'
import { abcFile, xyzFile } from '../utils/constant.js'

export const deleteTheFile = () => {
    const deleteFileAsync = () => {
        fs.unlink(abcFile, (err) => {
            if (err) console.log('file couldn\'t deleted ', err)
            console.log('file deleted successfully!!!')
        })
    }

    deleteFileAsync()
}


export const deleteTheFileUsingPromise = () => {
    const deleteFileAsync = () => {
        return new Promise((resolve, reject) => {
            fs.unlink(xyzFile, (err) => {
                if (err) reject(err)
                resolve('File deleted successfully!!!')
            })
        })
    }

    try {
        const msg = deleteFileAsync()
        return msg
    } catch (error) {
        return error
    }
}