const env = process.env;

const config = {
    db: {
        multipleStatements: true
    },
    listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
