const db = require('../dataBase/connection');

module.exports = {
    async listarTipo_ruas(request, response) {
        try {

            const sql = 'SELECT ID_Tipo_Rua, NM_Tipo_Rua FROM bd_tcc_infonet_224_monit_prev.tipo_rua;'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Tipos ruas',
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

    async atualizarTipo_ruas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Atualizar Tipos ruas',
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

    async InserirTipo_ruas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Inserir Tipos ruas',
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

    async excluirTipo_ruas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Excluir Tipos ruas',
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