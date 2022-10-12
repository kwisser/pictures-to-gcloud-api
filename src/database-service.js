const {downloadFile, uploadFile} = require('./upload-to-cloud-storage');
const pool_db = require("./pooldb.js")

async function handlePictures(body) {
    const id = body['_id'];
    const pics = body['photos']
    const uploadTasks = []
    const fileNames = []
    const amount_of_pictures = pics.length;
    global.picturesToDownload += amount_of_pictures

    for (let i = 0; i < amount_of_pictures; i++) {

        try {
            const picUrl = pics[i]['url']
            const filename = pics[i]['fileName']
            const picBuffer = await downloadFile(picUrl)

            console.log(`Profile ID: ${id} Download for Picture: ${i+1}/${amount_of_pictures} finished`)
            fileNames.push(filename)
            uploadTasks.push(uploadFile(filename, picBuffer))
        } catch (exception) {
            console.log(`Error: ${id} ${exception}`)
        }
    }
    await changePicURL(uploadTasks, amount_of_pictures, id, fileNames)
}

async function changePicURL(uploadTasks, amount_of_pictures, id, fileNames) {
    try {
        await Promise.all(uploadTasks).then(async values => {
            for (let uploadResult in values) {
                const current_url = "https://storage.googleapis.com/yourprojektname/" + fileNames[uploadResult]
                const updateUrlQuery = `INSERT INTO links (link) VALUES ('${current_url}')`
                console.log(updateUrlQuery)
                await pool_db.query(updateUrlQuery)
            }
        })
    } catch (e) {
        console.log("Error: ", id, " ", e)
    }
    global.picturesToDownload -= amount_of_pictures
    console.info("Successful added ", amount_of_pictures, " Pictures for ", id)
}


module.exports = {
    handlePictures
}
