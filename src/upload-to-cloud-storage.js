const https = require("https");
const {Storage} = require('@google-cloud/storage');
const stream = require('stream');

const bucketName = 'YOUR_BUCKET_NAME';
const projectId = 'YOUR_PROJEKT_NAME'
const keyFilename = 'storage_key.json'

const config = {
    action: 'read',
    // A timestamp when this link will expire
    expires: '01-01-2026',
};


async function downloadFile(url) {
    return new Promise((resolve, reject) => {
        let req = https.get(url);
        req.on('response', res => {
            const data = [];
            res.on('data', function (chunk) {
                data.push(chunk);
            }).on('end', function () {
                resolve(Buffer.concat(data));
            });
        });
        req.on('error', err => {
            reject(err);
        });
    });
}


async function uploadFile(file_name, buffer) {
    const storage = new Storage({projectId, keyFilename});
    const bucketFile = storage.bucket(bucketName).file(file_name)
    const dataStream = new stream.PassThrough();

    dataStream.push(buffer, 'binary');
    dataStream.push(null);

    return new Promise((resolve, reject) => {
        dataStream.pipe(bucketFile.createWriteStream())
            .on('error', (error) => {
                reject(error)
            })
            .on('finish', () => {
                resolve();
            })
    }).then(() => storage.bucket(bucketName).file(file_name).getSignedUrl(config))
}


module.exports = {
    uploadFile,
    downloadFile,
}