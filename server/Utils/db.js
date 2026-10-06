import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboard',
});


connection.connect(function(err) {
if(err){
  console.error("Database connection error:", err.message);
}
else{
    console.log("connected");
}
});

export default connection;
