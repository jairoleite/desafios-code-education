const { Router } = require('express')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'db',
    database: 'nodedb',
    user: 'root',
    password: 'root',
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

//rota
const routes = new Router();

//insere pessoa
connection.query(`INSERT INTO people(name) values('Jairo Leite')`)


let pessoas = ''

//busca pessoas
connection.query('SELECT * FROM people', function (error, results, fields) {
    if (error) {
        console.log(error)
        throw error;
    }

    let i
    for (i = 0; i < results.length; i++) {
        pessoas += '<li>' + results[i].name + '</li>'
    }
});

connection.end()

//retorna lista de pessoas
routes.get('/pessoas', (req, res) => {
    let html = '<h1>Full Cycle</h1></br>'
    html += '<ul>'
    html += pessoas
    html += '</ul>'
    res.send(html)
})

module.exports = routes
