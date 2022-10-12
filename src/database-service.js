const {downloadFile, uploadFile} = require('./upload-to-cloud-storage');

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
}

module.exports = {
    handlePictures
}
