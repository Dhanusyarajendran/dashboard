import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dashboard',
});


connection.connect(function(err) {
if(err){
    console.log("connection error");
}
else{
    console.log("connected");
}
});

export default connection;
