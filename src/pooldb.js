const mysql = require('mysql');

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql/YOUR_PROJEKT_NAME:europe-west6:YOURDATABASE';

    // Establish a connection to the database
let pool = mysql.createPool({
        user: 'yourmysqlusername',
        password: 'yourmysqlpassword',
        database: 'pictures',
        charset: "utf8mb4_unicode_ci",
        // If connecting via unix domain socket, specify the path
        socketPath: dbSocketPath
    });

pool.getConnection((err,connection)=> {
    if(err)
        throw err;
    console.log(`Database connected successfully`);
    connection.release();
});

async function query(sql){
    try{
        pool.query(sql)
    }catch (error){
        console.log(`Error in Query: ${sql} ${error}`);
    }
}

module.exports = {
    query
}