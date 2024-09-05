import  express  from "express";/* Call the first two more important libs to use Mysql */
import mysql from 'mysql2';

// Configurações do servidor
const app = express();  /* Here we call the express function to call all the express lib */
app.use(express.json()); /* Than We get the method use with express.json() statement to call the middleware */

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  /* Call the mysql lib to start the connection with the BD */
    password: '',
    database: "escola"
});
connection.connect((err) => { /* Verify if the connection get an error */
  if(err){
    console.error(err)
  } else{
    console.log("Deu certo");
  }
})

export const con = connection;