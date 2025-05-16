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

            const {ID_Visita, ID_Tipo_Ocorrencia, DT_Visita, QT_Amostra_Coletada, DS_Ocorrencia, NM_Morador, DT_Nascimento, ID_Colaborador} = request.body
            const {ID_Visita_Item} = request.params

            const sql = 'update visita_item set ID_Visita = ?,  ID_Tipo_Ocorrencia = ?,  DT_Visita = ?,  QT_Amostra_Coletada = ?, DS_Ocorrencia = ?,  NM_Morador = ?, DT_Nascimento = ?, ID_Colaborador = ? where ID_Visita_Item = ?'

            const values = [ID_Visita, ID_Tipo_Ocorrencia, DT_Visita, QT_Amostra_Coletada, DS_Ocorrencia, NM_Morador, DT_Nascimento, ID_Colaborador, ID_Visita_Item]

            const dadosAtualizados = await db.query(sql, values)
             
            return response.status(200).json({
                sucesso: true,
                mensagem: `Visitas Item ${ID_Visita_Item} atualizado com sucesso!`,
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

    async inserirVisitas_itens(request, response) {
        try {

            const {ID_Visita, ID_Tipo_Ocorrencia, DT_Visita, QT_Amostra_Coletada, DS_Ocorrencia, NM_Morador, DT_Nascimento, ID_Colaborador} = request.body

            const sql = 'insert into visita_item (id_visita, id_tipo_ocorrencia, dt_visita, qt_amostra_coletada, ds_ocorrencia, nm_morador, dt_nascimento, id_colaborador) values (?,?,?,?,?,?,?,?)'

            const values = [ID_Visita, ID_Tipo_Ocorrencia, DT_Visita, QT_Amostra_Coletada, DS_Ocorrencia, NM_Morador, DT_Nascimento, ID_Colaborador]
            

            const [results] = await db.query(sql, values)

            const visitas_itemId = results.insertId

            return response.status(200).json({

                sucesso: true,
                mensagem: 'Visitas itens Inseridas',
                dados: visitas_itemId
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