//getting the client
const mysql = require('mysql2');

//creating teh connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'assignDBuser',
  password: 'assignDBpass',
  database: 'assignDB',//all of these values come form assignDB.sql lines 3 and 6
  //rowsAsArray: true,//*useful if you want to get results as an array rather than an object to preven thtem from clashing
});//inputtin the values into the connection establish the actaul connection

function getUsers(callback) {//the simulated database in this file
  connection.execute('SELECT * FROM `users`', function(err, results){
    //console.log("using getUser");
    callback(results);
  });
}

function addUser(user, callback) {
//see what order to pas values in 
//array of values
//they com ein an array
//object.values

  const sql = 'INSERT INTO `users` (`fname`, `lname`, `username`, `passwd`) VALUES (?,?,?,?)';
  const values = Object.values(user);// takes the values from the json object
  console.log("logging values" + values);

  connection.execute(sql, values, (err, result) =>{
    //console.log("using addUser");
    if(err instanceof Error){
    console.log(err);
    return;
  }
    //console.log(result);
    callback(result);
  })
};

module.exports = { getUsers, addUser };