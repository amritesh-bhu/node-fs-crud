import fs from "fs"

// Writting a file using callback
export const writeContentToFileUsingCallback = (jsonData) => {

    const { filename, content } = jsonData
    const writeFileAsync = (filename, callback) => {
        fs.writeFile(`/home/amritesh/workspace/filesystem-crud/files/${filename}`, content, (err, data) => {
            if (err) callback(err, null)
            callback(null, data)
        })
    }

    writeFileAsync(filename, (err) => {
        if (err) console.error(err)
    })

    return 'content has been added to the file successfully!!'
}
