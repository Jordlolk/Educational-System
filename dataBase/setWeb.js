import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { con } from './connection.js';
console.log(con);
// Cria uma instância do Express
const app = express();
// Configura os caminhos de arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, '..', 'public'); // Pasta pública para arquivos estáticos
const viewsPath = path.join(publicPath, 'views'); // Caminho para arquivos HTML dentro da pasta 'public'

// Define a porta na qual o servidor irá rodar
const port = 3000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(publicPath));

// Define uma rota para a raiz ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'cadastrarDirecao.html')); // Envia o arquivo HTML como resposta
});

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
