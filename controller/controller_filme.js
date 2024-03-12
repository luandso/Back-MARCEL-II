/**********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regra de negócio para os filmes *
 * Data: 30/01/2024                                                                                       *
 * Autor: Luan Oliveira                                                                      *
 * 1.0                                                                                                    *
 *********************************************************************************************************/

//Import do arquivo de configuração do Projeto
const message = require('../modulo/config.js')

  try{
//import do arquivo DAO para manipular dados dos filmes 
const filmesDAO = require('../model/DAO/filme.js')

//Função para inserir um novo filme
const setInserirNovoFilme = async (dadosFilme, contentType) => {

    if (String(contentType).toLowerCase() == 'application/json') {

        let statusValidated = false;
        let novoFilmeJSON = {};

        if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null, dadosFilme.nome.length > 80 ||
            dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null, dadosFilme.sinopse.length > 65000 ||
            dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null, dadosFilme.duracao.length > 8 ||
            dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null, dadosFilme.data_lancamento.length != 10 ||
            dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null, dadosFilme.foto_capa.length > 300 ||
            dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)

        ) {
            return message.ERROR_REQUIRED_FIELDS//400

        } else {

            //Validação para verificar se a data de relancameno tem um conteúdo válido
            if (dadosFilme.data_relancamento != '' &&
                dadosFilme.data_relancamento != null &&
                dadosFilme.data_relancamento != undefined) {
                //Verifica a qtde de caracter
                if (dadosFilme.data_relancamento.length != 10) {
                    return message.ERROR_REQUIRED_FIELDS//400
                } else {
                    statusValidated = true //validação para liberar a inserção dos dados no DAO
                }

            } else {
                statusValidated = true  //validação para liberar a inserção dos dados no DAO
            }

            //se a variável for verdadeira, podemos encaminhar os dados para o DAO
            if (statusValidated) {

                //encaminha os dados para o DAO inserir
                let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                if (novoFilme) {
                    //Cria o JSON de retorno com informações de requisição e os dados novos
                    novoFilmeJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoFilmeJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoFilmeJSON.message = message.SUCESS_CREATED_ITEM.message
                    novoFilmeJSON.filme = dadosFilme

                    return novoFilmeJSON //201

                } else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }

        }


    } else {
        return message.ERROR_CONTENT_TYPE
    }

}

//Função para atualizar um filme existente
const setAtualizarFilme = async () => {

}

//Função para excluir um Filme existente
const setExcluirFilme = async () => {

}

//Função para retornar todos os filmes do database
const getListarFilmes = async () => {

    //Cria o objeto JSON
    let filmesJSON = {}

    //Cria a função DAO para retornar os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()



    //Validação para criar o JSON de dados
    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200

            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }


}

//Função para retornar filtro do filme pelo ID
const getBuscarFilme = async (id) => {

    let idFilme = id

    let filmeJSON = {}

    //Validação para verificar o ID do Filme antes de encaminhar para o DAO
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {

        //Encaminha o ID do filme para o DAO para o retorno do Banco de Dados
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        //Validação para verificar se o DAO retornou dados
        if (dadosFilme) {

            if (dadosFilme.length > 0) {
                //Cria o JSON de retorno de dados
                filmeJSON.filme = dadosFilme
                filmeJSON.status_code = 200

                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

//Função para retornar filtro do filme pelo nome
const getBuscarNomeFilme = async (nome) => {

    let nomeFilme = nome

    let filmeJSON = {}

    if (nomeFilme == '' || nomeFilme == undefined) {
        return message.ERROR_NOT_FOUND
    } else {

        let dadosFilme = await filmesDAO.selectByNomeFilme(nomeFilme)

        if (dadosFilme) {

            if (dadosFilme.length > 0) {

                filmeJSON.filme = dadosFilme
                filmeJSON.status_code = 200

                return filmeJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }catch(error){
        
    }
}



  }


module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarNomeFilme
}