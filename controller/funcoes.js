/***********************************************************************************************
 * Objetivo: Criar uma estrutura para trazer informações sobre os dados da ACME Filmes         *
 * Autor: Luan Oliveira                                                             *
 * Data: 23/01/2024                                                                            *
 * Versão: 1.0                                                                                 *
***********************************************************************************************/

var catalogo = require('../model/filmes.js')

const getListarFilmes = () => {

    const filmesInfo = catalogo.filmes.filmes

    let filmesJSON = {}
    let filmesARRAY = []

    filmesInfo.forEach((filme) => {
        let filmesJSON = {

            id: filme.id,
            nome: filme.nome,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            data_lancamento: filme.data_lancamento,
            data_relancamento: filme.data_relancamento,
            foto_capa: filme.foto_capa,
            valor_unitario: filme.valor_unitario

        }

        filmesARRAY.push(filmesJSON)

    })

    filmesJSON.filmes = filmesARRAY
    filmesJSON.quantidade = filmesARRAY.length
    
    return filmesJSON


}

const getIdFilme = (id) => {

    const filmesInfo = catalogo.filmes.filmes

    let filmeEncontrado = id,
            situacao = false

    filmesInfo.forEach(( filme) => {

        if (filme.id == id) {
            filmeEncontrado = {

                id: filme.id,
                nome: filme.nome,
                sinopse: filme.sinopse,
                data_lancamento: filme.data_lancamento,
                data_relancamento: filme.data_relancamento,
                foto_capa: filme.foto_capa,
                valor_unitario: filme.valor_unitario
            }
            situacao = true
        }
    })

    return filmeEncontrado
}

const getNomeFilme = (nome) =>{
    
    const filmesInfo = catalogo.filmes.filmes

    let filmeEncontrado = nome,
            situacao = false

    filmesInfo.forEach((filme) => {

        if (filme.nome == nome) {
            filmeEncontrado = {

                id: filme.id,
                nome: filme.nome,
                sinopse: filme.sinopse,
                data_lancamento: filme.data_lancamento,
                data_relancamento: filme.data_relancamento,
                foto_capa: filme.foto_capa,
                valor_unitario: filme.valor_unitario
            }
            situacao = true
        }
    })

    return filmeEncontrado


}

module.exports = {
    getListarFilmes,
    getIdFilme, 
    getNomeFilme
}
