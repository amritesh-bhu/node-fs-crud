import fs from "fs"

const path = '/home/amritesh/workspace/filesystem-crud/files'

// Writting a file using callback
export const writeContentToFileUsingCallback = (jsonData) => {

    const { filename, content } = jsonData
    console.log('content type ', content)

    const jsonString = JSON.stringify(content)
    const writeFileAsync = (filename, callback) => {
        fs.writeFile(`${path}/${filename}`, jsonString, (err, data) => {
            if (err) callback(err, null)
            callback(null, data)
        })
    }

    writeFileAsync(filename, (err) => {
        if (err) console.error(err)
    })

    return 'content has been added to the file successfully!!'
}

export const writeContentToFileUsingPromise = async (jsonData) => {
    const { filename, content } = jsonData

    const jsonString = JSON.stringify(content)
    const writeFileAsync = (filename, content) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${path}/${filename}`, jsonString, (err, data) => {
                if (err) reject(err)
                resolve(data)
            })
        })
    }

    const data = await writeFileAsync(filename, content)
    console.log(data)
    return "data added to the file!!!"
}
