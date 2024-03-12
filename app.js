/***********************************************************************************************
 * Objetivo: Criar uma estrutura para trazer informações sobre os dados da ACME Filmes         *
 * Autor: Gustavo Henrique                                                                     *
 * Data: 23/01/2024                                                                            *
 * Versão: 1.0                                                                                 *
***********************************************************************************************/

/*Para realizar a integração com Banco de Dados precisamos de uma biblioteca
 * 
 * SEQUELIZE ORM (mais aniga)
 * PRISMA ORM    (mais atualizada)
 * FASTFY ORM    (mais atualizada)
 * 
 * Instalação do PRISMA ORM
 * 
 * npm install prisma --save (Conexão com database)
 * npm install @prisma/client -- save (executa os scripts SQL no database)
 * npx prisma init(inicia a utilização do prisma no projeto)
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()


app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//Cria um objeto para definir o tipo de dados que irá chegar no BODY (JSON)
const bodyParserJSON = bodyParser.json()

/*************************** Import dos arquivos internos do projeto***********************/

const controllerFilmes = require('./controller/controller_filme.js')

/******************************************************************************************/

//EndPoints: listar todos os filmes
app.get('/v1/acme/filmes', cors(), async (request, response, next) => {

    let controleListaFilmes = require('./controller/funcoes.js')
    let filmes = controleListaFilmes.getListarFilmes()
    response.json(filmes)
    response.status(200)
})

//EndPoints: listar filmes pelo id
app.get('/v1/acme/filme/:id', cors(), async (request, response, next) => {

    let controleFilmeId = require('./controller/funcoes.js')
    let id = request.params.id

    let dadosFilme = controleFilmeId.getIdFilme(id)

    if (dadosFilme) {
        response.json(dadosFilme)
        response.status(200)
    } else {
        response.status(404)
        response.json({ erro: "Não foi possivel encontrar um item" })
    }


})

//New EndPoint: retorna dados do Banco De Dados
app.get('/v2/acme/filmes', cors(), async (request, response, next) => {

    //Chama a função para retornar os dados de FIlme
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    //Validação para retornar os dados ou o erro 404
    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({ message: 'Nenhum resgistro encontrado' })
        response.status(404)
    }

})

//EndPoints: listar filme pelo nome usando Query
app.get('/v2/acme/filtro/filme', cors(), async (request, response, next) => {

    let nomeFilme = request.query.nomefilme
    
    let dadosFilme = await controllerFilmes.getBuscarNomeFilme(nomeFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

//EndPoints: listar filmes filtrando pelo id
app.get('/v2/acme/filme/:id', cors(), async (request, response, next) => {
    console.log('teste')

    //Recebe o ID encaminhando a requisição
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})


app.post('/v2/acmefilmes/filme',  cors(), bodyParserJSON, async (request, response, next) =>{

    //Recebe os dados encaminhados no Body da requisição
    let dadosBody = request.body

    //Encaminha os dados para cotroller inserir no BD
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.listen(8080, function () {
    console.log('servidor rodando na porta 8080')
})

