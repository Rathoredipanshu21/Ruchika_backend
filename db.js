import mysql from'mysql'

const db = mysql.createConnection({
    host: 'localhost',   
    user: 'root',         
    database: 'ruchikas' 
});

db.connect(err => {
    if (err) {
        return console.error('Error connecting to the database: ' + err.message);
    }
    console.log('Connected to the MySQL database.');
});

export default db;

