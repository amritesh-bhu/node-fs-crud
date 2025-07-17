import fs from "fs"

const path = '/home/amritesh/workspace/filesystem-crud/files'

// Writting a file using callback
export const writeContentToFile = (jsonData) => {

    const { filename, content } = jsonData

    const jsonString = JSON.stringify(content)
    const writeFileAsync = (filename) => {
        fs.writeFile(`${path}/${filename}`, jsonString, (err) => {
            if (err) console.log(err)
        })
    }
    writeFileAsync(filename)

    return 'content has been added to the file successfully!!'
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

    const data = await writeFileAsync()
    console.log(data)
    return data
}
