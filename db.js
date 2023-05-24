const { Client } = require('pg');
const DB_URI = process.env.NODE_ENV === 'test' ? `postgresql://dom:${'dom123321!'}@127.0.0.1:5432/messagely_test`: `postgresql://dom:${'dom123321!'}@127.0.0.1:5432/messagedb`;
 
    
    

let db = new Client({
    connectionString: DB_URI
});

db.connect();

module.exports = db;
