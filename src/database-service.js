const {downloadFile, uploadFile} = require('./upload-to-cloud-storage');

async function handlePictures(body) {
    const id = body['_id'];
    const pics = body['photos']
    const uploadTasks = []
    const fileNames = []
    const amount_of_pictures = pics.length;
    
    // Use a local variable instead of global for cloud functions
    let picturesToDownload = 0;
    if (global.picturesToDownload !== undefined) {
        global.picturesToDownload += amount_of_pictures;
        picturesToDownload = global.picturesToDownload;
    } else {
        picturesToDownload = amount_of_pictures;
    }

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
    
    // Wait for all uploads to complete
    await Promise.all(uploadTasks);
    
    // Decrease the counter after uploads are done
    if (global.picturesToDownload !== undefined) {
        global.picturesToDownload -= amount_of_pictures;
    }
    
    return {
        success: true,
        message: `Processed ${amount_of_pictures} pictures for ID: ${id}`,
        fileNames: fileNames
    };
}

module.exports = {
    handlePictures
}
