const db = require('../dataBase/connection');

module.exports = {
    async listarSetores(request, response) {
        try {

            const sql = 'SELECT id_setor, nm_setor FROM bd_tcc_infonet_224_monit_prev.setor;'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Setores',
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

    async atualizarSetores(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Atualizar de Setores',
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

    async inserirSetores(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Inserir Setores',
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

    async excluirSetores(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Excluir Setores',
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