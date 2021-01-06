const express = require('express');

const server = express();

// p falar que estamos mandando uma estrutura tipo json
server.use(express.json());

const cursos = ['Node JS', 'JavaScript', 'React Native'];

// middleware global
server.use((req, res, next) =>{
    console.log(`URL CHAMADA ${req.url}`);

    return next();
});

function checkCurso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: "Nome do curso é obrigatório"});
    }

    return next();
};

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({error: 'O curso não existe'})
    }

    return next();

}

//read
server.get('/cursos', (req, res) =>{
    return res.json(cursos);
});

server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    // p/ pegar o index/id passado pela url (cursos/3)
    const { index } = req.params;

    return res.json(cursos[index])
});

//create
server.post('/cursos', checkCurso, (req, res) => {
    // p/ pegar o parametro name do obj json passado como request
    const {name} = req.body;
    // p/ add dentro da lista cursos esse novo obj name (acho)
    cursos.push(name);

    return res.json(cursos);
});

// update
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    //pegando o index do obj pela url (cursos/2)
    const {index} = req.params;
    // pegando o name do obj json mandado pelo request
    const {name} = req.body;
    // setando o nome conforme o index da lista cursos
    cursos[index] = name;

    return res.json(cursos);
})

// delete
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const {index} = req.params;

    cursos.splice(index, 1);
    return res.json(cursos);
});



server.listen(3000);