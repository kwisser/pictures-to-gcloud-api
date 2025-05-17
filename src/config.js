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
        projectId: env.PROJECT_ID
        // Using Application Default Credentials instead of key file
    }
};

module.exports = config;
