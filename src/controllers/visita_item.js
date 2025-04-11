const db = require('../dataBase/connection');

module.exports = {
    async listarVisitas_itens(request, response) {
        try {

            const sql = 'SELECT ID_Visita_Item, ID_Visita, ID_Tipo_Ocorrencia, DT_Visita, QT_Amostra_Coletada, DS_Ocorrencia	FROM visita_item;'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Visitas_Itens',
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

    async atualizarVisitas_itens(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Atualizar Visitas_Itens',
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

    async inserirVisitas_itens(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Inserir Visitas_Itens',
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

    async excluirVisitas_itens(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Excluir Visitas_Itens',
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