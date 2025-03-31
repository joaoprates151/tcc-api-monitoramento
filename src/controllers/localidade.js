const db = require('../dataBase/connection');

module.exports = {
    async listarLocalidades(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Localidades',
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

    async atualizarLocalidades(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Atualizar de Localidades',
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

    async inserirLocalidades(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Inserir Localidades',
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

    async excluirLocalidades(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Excluir Localidades',
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