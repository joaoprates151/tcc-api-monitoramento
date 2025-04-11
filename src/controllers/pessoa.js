const db = require('../dataBase/connection');

module.exports = {
    async listarPessoas(request, response) {
        try {

            const sql = 'SELECT ID_Pessoa, TP_Pessoa, NM_Pessoa, NO_Documento, DT_Nascimento,no_imovel, Complemento, no_Telefone, Email, ID_Rua FROM pessoa;'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista Pessoas',
                itens: rows.length,
                dados: rows,
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    },

    async atualizarPessoas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Atualizar Pessoas',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    },

    async inserirPessoas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Inserir Pessoas',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    },

    async excluirPessoas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Excluir Pessoas',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    }
}