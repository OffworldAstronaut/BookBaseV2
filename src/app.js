const express = require('express')
const app = express();
const mysql = require('mysql2');
const path = require('path');

// Adicionando o middleware para processar o corpo da requisição como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Abre uma conexão com o banco de dados MySQL
const connection = mysql.createPool({
    host: 'localhost', // coloque aqui o ip ou nome da máquina
    user: 'root', // mude aqui o usuário
    password: 'root', // mude aqui a senha
    database: 'meuslivros' // mude aqui o nome do bd
});

// LIVROS

// carrega a tabela contendo todos os livros registrados para o usuário - GET 
app.get('/livros', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'livros.html'));
});

// retorna um JSON contendo todos os livros cadastrados - GET 
app.get('/dados_livros', function (req, res) {
    connection.query('SELECT * FROM livro',
        function (err, results) {
            res.send(results)
        }
    );
})

// carrega no navegador a página para cadastro dos livros - POST 
app.get('/cadastro_livros', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cadastro_livros.html'));
});

// retorna um dado livro por meio do ID especificado - GET
app.get('/livros/:id_livro', function (req, res) {
    connection.query('SELECT * FROM livros WHERE id_livro=?', [req.params.id_livro],
        function (err, results) {
            res.send(results)
        }
    );
})

// adiciona um livro no banco de dados - POST
app.post('/dados_livros', function (req, res) {
    const { titulo_livro, genero_livro, lingua_livro, origem_livro, isbn_livro, data_pub_livro } = req.body;
    connection.query('INSERT INTO livro (titulo, genero, lingua, origem, isbn, data_pub) VALUES (?, ?, ?, ?, ?, ?)', [titulo_livro, genero_livro, lingua_livro, origem_livro, isbn_livro, data_pub_livro], function (err, results) {
        if (err) {
            console.log(err)
            res.status(500).send('Erro ao inserir livro.');
        }
        else {
            res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cadastro_livros.html'));
        }
    });
}
);

// Atualiza um livro no banco de dados por meio do ID especificado - PUT
app.put('/livros/:id_livro', function (req, res) {
    const { titulo_livro, genero_livro, lingua_livro, origem_livro, isbn_livro, data_pub_livro } = req.body;
    connection.query('UPDATE livro SET titulo=?, genero=?, lingua=?, origem=?, isbn=?, data_pub=? WHERE id_livro=?', [titulo_livro, genero_livro, lingua_livro, origem_livro, isbn_livro, data_pub_livro, req.params.id_livro], function (err, results) {
        if (err) {
            console.log(err)
            res.status(500).send('Erro ao atualizar livro.');
        } else {
            res.send('Livro atualizado com sucesso.');
        }
    });
});

// Deleta um livro do banco de dados por meio do ID especificado - DELETE
app.delete('/livros/:id_livro', function (req, res) {
    connection.query('DELETE FROM livro WHERE id_livro=?', [req.params.id_livro], function (err, results) {
        if (err) {
            console.log(err)
            res.status(500).send('Erro ao excluir livro.');
        } else {
            res.send('Livro excluído com sucesso.');
        }
    });
});


// AUTORES

// carrega a tabela contendo todos os autores registrados para o usuário - GET
app.get('/autores', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'autores.html'));
});

// retorna um JSON contendo todos os autores registrados - GET
app.get('/dados_autores', function (req, res) {
    connection.query('SELECT * FROM autor',
        function (err, results) {
            res.send(results)
        }
    );
});

// retorna um dado autor por meio do ID especificado - GET
app.get('/autores/:id_autor', function (req, res) {
    connection.query('SELECT * FROM autor WHERE id_autor=?', [req.params.id_autor],
        function (err, results) {
            res.send(results)
        }
    )
})

// carrega a página de cadastro de autores para o usuário - POST 
app.get('/cadastro_autores', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cadastro_autores.html'));
});


// adiciona um autor no banco de dados - POST
app.post('/dados_autores', function (req, res) {
    const { pnome_autor, mnome_autor, unome_autor, pais_autor, ano_nac_autor, ano_morte_autor } = req.body;
    connection.query('INSERT INTO autor (pnome, mnome, unome, pais, ano_nac, ano_morte) VALUES (?, ?, ?, ?, ?, ?)', [pnome_autor, mnome_autor, unome_autor, pais_autor, ano_nac_autor, ano_morte_autor], function (err, results) {
        if (err) {
            console.log(err)
            res.status(500).send('Erro ao inserir autor.');
        }
        else {
            res.sendFile(path.join(__dirname, '..', 'public', 'html', 'cadastro_autores.html'));
        }
    })
})

// Atualiza um autor no banco de dados por meio do ID especificado - PUT
app.put('/dados_autores/:id_autor', function (req, res) {
    const { pnome_autor, mnome_autor, unome_autor, pais_autor, ano_nac_autor, ano_morte_autor } = req.body;
    connection.query('UPDATE autor SET pnome=?, mnome=?, unome=?, pais=?, ano_nac=?, ano_morte=? WHERE id_autor=?', [pnome_autor, mnome_autor, unome_autor, pais_autor, ano_nac_autor, ano_morte_autor, req.params.id_autor], function (err, results) {
        if (err) {
            console.log(err)
            res.status(500).send('Erro ao atualizar autor.');
        } else {
            res.send('Autor atualizado com sucesso.');
        }
    });
});

// Deleta um autor do banco de dados por meio do ID especificado - DELETE
app.delete('/dados_autores/:id_autor', function (req, res) {
    connection.query('DELETE FROM autor WHERE id_autor=?', [req.params.id_autor], function (err, results) {
        if (err) {
            console.log(err)
            res.status(500).send('Erro ao excluir autor.');
        } else {
            res.send('Autor excluído com sucesso.');
        }
    });
});

// Executa o servidor HTTP na porta padrão (80)
app.listen(80)