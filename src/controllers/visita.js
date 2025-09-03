const db = require('../dataBase/connection');

module.exports = {
    async listarVisitas(request, response) {
        try {

            const sql = 'SELECT  ID_Visita, ID_Usuario, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Unidade_Saude, ID_Pessoa, ID_Endereco, ST_Imovel, ST_Situacao, QT_Amostra_Coletada, SN_Acidente, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status, Assinatura_Base64 FROM visita;'

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

            const {ID_Usuario, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Unidade_Saude, ID_Pessoa, ID_Endereco, ST_Imovel, ST_Situacao, QT_Amostra_Coletada, SN_Acidente, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status, Assinatura_Base64} = request.body
            const {ID_Visita} = request.params

            const sql = 'update visita set ID_Usuario =?, DT_Cadastro =?, DT_Solicitacao =?, DT_Atendimento =?, ID_Unidade_Saude =?, ID_Pessoa =?, ID_Endereco =?, ST_Imovel =?, ST_Situacao =?, QT_Amostra_Coletada =?, SN_Acidente =?, SN_Demanda_Expontanea =?, DS_Observacao =?, SN_Agenda_Retorno =?, DT_Retono =?, ST_Status =?, Assinatura_Base64 =? where ID_Visita = ?'

            const values = [ID_Usuario, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Unidade_Saude, ID_Pessoa, ID_Endereco, ST_Imovel, ST_Situacao, QT_Amostra_Coletada, SN_Acidente, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status, Assinatura_Base64, ID_Visita]

            const dadosAtualizados = await db.query(sql, values)
             
            return response.status(200).json({
                sucesso: true,
                mensagem: `Visita ${ID_Visita} atualizado com sucesso!`,
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

            const {ID_Usuario, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Unidade_Saude, ID_Pessoa, ID_Endereco, ST_Imovel, ST_Situacao, QT_Amostra_Coletada, SN_Acidente, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status, Assinatura_Base64} = request.body

            const sql = 'insert into visita (ID_Usuario, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Unidade_Saude, ID_Pessoa, ID_Endereco, ST_Imovel, ST_Situacao, QT_Amostra_Coletada, SN_Acidente, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status, Assinatura_Base64) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

            const values = [ID_Usuario, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Unidade_Saude, ID_Pessoa, ID_Endereco, ST_Imovel, ST_Situacao, QT_Amostra_Coletada, SN_Acidente, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno, DT_Retono, ST_Status, Assinatura_Base64]
            

            const [results] = await db.query(sql, values)

            const visitaId = results.insertId

            return response.status(200).json({

                sucesso: true,
                mensagem: 'Visitas Inseridas',
                dados: visitaId
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
            const {ID_Visita} = request.params

            const sql = 'delete from visita where ID_Visita = ?'

            const values = [ID_Visita]
            

            const [results] = await db.query(sql, values)

            if( results.affectedRows === 0 )
            {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Visita ${ID_Visita} não encontrado!`,
                    dados: null
                })
            }

            return response.status(200).json({

                sucesso: true,
                mensagem: `Visita ${ID_Visita} excluida com sucesso!`,
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