const express = require("express");
const analisador = require("body-parser");
const mongoDbClient = require("mongodb").MongoClient;

const app = express();

app.use(
    analisador.urlencoded( { extended:true } )
);

var db 
mongoDbClient.connect('mongodb://localhost:27017/local', (erro, banco) => {
    if (erro) return console.log(erro)

    db = banco;

    app.listen(3000, function() {
        console.log("ServiÃ§o rodando. \n Banco de dados: " + banco.databaseName)
    });
})

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/index.html')
})

app.get('/list', (req, resp) => {
    var dados = db.collection('frases').find().toArray((erro, resultado) => {
        console.log(resultado);
        resp.write(resultado.result);
    })
})

app.post('/quotes', (req, resp) => {
    db.collection("frases").save(req.body, (erro, resultado) => {
        if (erro) return console.log(erro);
        console.log(req.body);
        console.log(resultado.result);
    })
    console.log(req.body);
    return 200;
})
