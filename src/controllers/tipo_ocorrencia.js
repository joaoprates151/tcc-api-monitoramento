const db = require('../dataBase/connection');

module.exports = {
    async listarTipo_ocorrencias(request, response) {
        try {

            const sql = 'SELECT ID_Tipo_Ocorrencia, NM_Tipo_Ocorrencia, ID_Usuario_cadastro, DT_Cadastro, Icone, Cor FROM tipo_ocorrencia;'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Tipos de ocorrência',
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

    async atualizarTipo_ocorrencias(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Atualizar Tipos de ocorrência',
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

    async InserirTipo_ocorrencias(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Inserir Tipos de ocorrência',
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

    async excluirTipo_ocorrencias(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Excluir Tipos de ocorrência',
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