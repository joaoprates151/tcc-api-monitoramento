const db = require('../dataBase/connection');

module.exports = {
    async listarVisitas(request, response) {
        try {

            const sql = 'SELECT  ID_Colaborador, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Rua, NO_Imovel, NM_Morador, NO_Telefone, DS_Ponto_Referencia, DS_PSF, NM_Agente_Comunitario, ST_Imovel, SN_Vistoriada, SN_Acidente, SINAN, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono FROM visita;'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Visitas',
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

    async atualizarVisitas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Atualizar Visitas',
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

    async inserirVisitas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Inserir Visitas',
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

    async excluirVisitas(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Excluir Visitas',
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