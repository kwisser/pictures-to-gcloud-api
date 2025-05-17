// Load environment variables from .env file
require('dotenv').config();

const env = process.env;

const config = {
    db: {
        multipleStatements: true
    },
    listPerPage: env.LIST_PER_PAGE || 10,
    storage: {
        bucketName: env.BUCKET_NAME,
        projectId: env.PROJECT_ID,
        keyFilename: env.KEY_FILENAME || 'storage_key.json'
    }
};

module.exports = config;
