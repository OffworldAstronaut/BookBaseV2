const express = require('express')
const app = express();
const mysql = require('mysql2');
const path = require('path');

// Adicionando o middleware para processar o corpo da requisição como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Rota para a página da tabela de livros
app.get('/livros', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'livros.html'));
});

// Rota para a página da tabela de livros
app.get('/autores', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'autores.html'));
});

// cria a conexao com o banco de dados
const connection = mysql.createPool({
    host: 'localhost', // coloque aqui o ip ou nome da máquina
    user: 'root', // mude aqui o usuário
    password: 'root', // mude aqui a senha
    database: 'meuslivros' // mude aqui o nome do bd
});

app.get('/dados_livros', function (req, res) {
    connection.query('SELECT * FROM livro',
        function (err, results) {
            res.send(results)
        }
    );
})

app.get('/dados_autores', function (req, res) {
    connection.query('SELECT * FROM autor',
        function (err, results) {
            res.send(results)
        }
    );
})

app.get('/livros/:id_livro', function (req, res) {
    connection.query('SELECT * FROM livros WHERE id_livro=?', [req.params.id_livro],
        function (err, results) {
            res.send(results)
        }
    );
})

// Executa o servidor HTTP na porta padrão (80)
app.listen(80) 