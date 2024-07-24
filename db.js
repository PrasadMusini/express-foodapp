const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Prasad@10',
    database: 'foodapp'
});

// Export the pool
module.exports = pool.promise();
