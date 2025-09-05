const db = require('../dataBase/connection');

module.exports = {
    async listarVisitas_itens(request, response) {
        try {

            const sql = 'SELECT ID_Visita_Item, ID_Visita, ID_Tipo_Ocorrencia, SINAN, DS_Ocorrencia FROM visita_item;'

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

            const {ID_Visita, ID_Tipo_Ocorrencia, SINAN, DS_Ocorrencia} = request.body
            const {ID_Visita_Item} = request.params

            const sql = 'update visita_item set ID_Visita =?, ID_Tipo_Ocorrencia =?, SINAN =?, DS_Ocorrencia =? where ID_Visita_Item = ?'

            const values = [ID_Visita, ID_Tipo_Ocorrencia, SINAN, DS_Ocorrencia, ID_Visita_Item]

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

            const {ID_Visita, ID_Tipo_Ocorrencia, SINAN, DS_Ocorrencia} = request.body

            const sql = 'insert into visita_item (ID_Visita, ID_Tipo_Ocorrencia, SINAN, DS_Ocorrencia) values (?,?,?,?)'

            const values = [ID_Visita, ID_Tipo_Ocorrencia, SINAN, DS_Ocorrencia]
            

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
            const {ID_Visita_Item} = request.params

            const sql = 'delete from visita_item where ID_Visita_Item = ?'

            const values = [ID_Visita_Item]
            

            const [results] = await db.query(sql, values)

            if( results.affectedRows === 0 )
            {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Visita item ${ID_Visita_Item} não encontrado!`,
                    dados: null
                })
            }

            return response.status(200).json({

                sucesso: true,
                mensagem: `Visita item ${ID_Visita_Item} excluida com sucesso!`,
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