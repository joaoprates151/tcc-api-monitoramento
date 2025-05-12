const db = require('../dataBase/connection');

module.exports = {
    async listarVisitas(request, response) {
        try {

            const sql = 'SELECT  ID_Colaborador_Agente, ID_Usuario_Cadastro, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Rua, NO_Imovel, NO_Telefone, DS_Ponto_Referencia, ID_Unidade_saude, ST_Imovel, SN_Vistoriada, SN_Acidente, SINAN, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status FROM visita;'

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

            const {ID_Colaborador_Agente, ID_Usuario_Cadastro, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Rua, NO_Imovel, NO_Telefone, DS_Ponto_Referencia, ID_Unidade_saude, ST_Imovel, SN_Vistoriada, SN_Acidente, SINAN, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status} = request.body
            const {ID_Visita} = request.params

            const sql = 'update visita set ID_Colaborador_Agente =?, ID_Usuario_Cadastro =?, DT_Cadastro=?, DT_Solicitacao=?, DT_Atendimento=?, ID_Rua=?, NO_Imovel=?, NO_Telefone=?, DS_Ponto_Referencia=?, ID_Unidade_saude=?, ST_Imovel=?, SN_Vistoriada=?, SN_Acidente=?, SINAN=?, SN_Demanda_Expontanea=?, DS_Observacao=?, SN_Agenda_Retorno=?, DT_Retono=?, ST_Status=? where ID_Visita = ?'

            const values = [ID_Colaborador_Agente, ID_Usuario_Cadastro, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Rua, NO_Imovel, NO_Telefone, DS_Ponto_Referencia, ID_Unidade_saude, ST_Imovel, SN_Vistoriada, SN_Acidente, SINAN, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status]

            const dadosAtualizados = await db.query(sql, values)
             
            return response.status(200).json({
                sucesso: true,
                mensagem: `Visita ${ID_localidade} atualizado com sucesso!`,
                dados: dadosAtualizados[0].affectedRows
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