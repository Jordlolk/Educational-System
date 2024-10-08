import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import  {connection}  from '../dataBase/connection.js';
// CALL EXPRESS LIB
const app = express();
app.use(express.json())
// THIS CODE ABOVE IS THE PART OF CODE THAT MAKES THE CONNECTION WITH SQL
// FIRST IT VERIFY WHAT REQUESTION IT WILL RECEIVE, IF IT A "DIRETOR" DATA OR "ALUNO" DATA.
// FOR WHICH ONE THE CODE TREATS THE USER´S ENTRANCE AFTER THIS RUNS THE SQL STRING.
// THE REST IS CATCHES FOR TREAT ERRORS.

// update disciplina set cpf_docente = (select cpf from docente where id_docente = 1) where id_disciplina = 1;
let SQLstring = null;
let infomationNeeded = null;
let resultBD;

/* const query = async (sql, params = []) => {
     return new Promise((resolve, reject) => {
        connection.query(sql, params, (err,res) => {
            if(err){return reject(err)}
            return resolve(res)
        })
    })
} */
/* SQLstring = 'SELECT * FROM docente'
try {
   const result = await query(SQLstring)
   let resultOfBd = result.map((infos, i) => { 
       return infos.nome
   })
   res.status(200).json({message : 'Pesquisa realizada com sucesso!', resultOfBd})
} catch (error) {
   console.log(error.message);
} */

app.post('/submit-form-disciplina', (req, res) => {
    const {disciplina,cpfDocente} = req.body
    SQLstring = 'INSERT INTO disciplina(nome, cpf_docente) values(?,?);'
    infomationNeeded = [disciplina, cpfDocente]
    try {
        connection.query(SQLstring,infomationNeeded, (err,result) => {
            if(err){
                res.status(500).json({message: 'Erro'})
            }
            else{
                res.status(200).json({message : 'Dados inseridos com sucesso!'})
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar a requisição', error })
    }
})

app.post('/submit-form-register', async (req, res) => {
    const {nome , cpf} = req.body
    infomationNeeded = [nome, cpf]
    let howManyDirectors = await connection.promise().query('SELECT COUNT(*) FROM DIRETOR')
    if(howManyDirectors[0].length > 0){
        SQLstring = 'UPDATE diretor set nome = ?, cpf = ?'
    } else {
        SQLstring = 'INSERT INTO DIRETOR(nome, cpf) values(?,?)'
    }
    try {
        connection.query(SQLstring, infomationNeeded, (err, result) => {
            if(err){
                console.error('Erro ao inserir dados: ' + err)
                res.status(500).json({ message: `Erro ao inserir dados: ${err.message}`});
            }
            else {
                res.status(200).json({ message: 'Dados inseridos com sucesso' });
            }
        })
    } catch (error) {
        console.error('Erro ao processar a requisição:', error.message);
        res.status(500).json({ message: 'Erro ao processar a requisição', error });
    }
})

app.post('/submit-form', async (req, res) => {
    const { nome, cpf, nasci, tipo } = req.body;
    try {
        switch(tipo){
            case 'diretor':
                SQLstring = 'INSERT INTO diretor (nome, cpf) VALUES (?, ?)'
                infomationNeeded = [nome, cpf]
            break;
            case 'aluno':
                SQLstring = `CALL InserirAluno(?, ?, ?)`
                infomationNeeded = [cpf, nome, nasci]
            break;
           /*  case 'altDIR':
                SQLstring = 'UPDATE diretor set cpf = ?, nome = ?'
                infomationNeeded = [cpf, nome]
            break; */
            default:
                res.status(400).json({ message: 'Tipo de usuário não suportado' });
            break;
        }
        connection.query(SQLstring,infomationNeeded,  (err, results) => {
            if (err) {
                console.error('Erro ao inserir dados: ' + err)
                res.status(500).json({ message: `Erro ao inserir dados: ${err.message}`});
            } else {
                res.status(200).json({ message: 'Dados inseridos com sucesso' });
            }
        });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error.message);
        res.status(500).json({ message: 'Erro ao processar a requisição', error });
    }
});
// SETUP THE FILES PATH
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '..', 'public'); // PUBLIC FOLDER FOR STATIC FILES
const viewsPath = path.join(publicPath, 'views'); // PATH TO LISTEN HTML FILES
// DEFINE THE GATE OF THE NODE´S SERVER 
const port = 3000;
// USE STATIC FILES
app.use(express.static(publicPath));
// CREATE THE ROOT PATH "/ "
app.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'criarDisciplina.html')); // SEND HTML FILE
});
// INITIATE THE SEVER WITH THE PORT "3000"
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

