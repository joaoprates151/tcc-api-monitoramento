const db = require('../dataBase/connection');

module.exports = {
    async listarUnidades_saude(request, response) {
        try {

            const sql = 'SELECT ID_Unidade_Saude, NM_Unidade_Saude	FROM Unidade_Saude'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Unidade de Saúde',
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

    async atualizarUnidades_saude(request, response) {
        try {

            const {NM_Unidade_Saude} = request.body
            const {ID_Unidade_Saude} = request.params

            const sql = 'update Unidade_Saude set NM_Unidade_Saude = ? where ID_Unidade_Saude = ?'

            const values = [NM_Unidade_Saude, ID_Unidade_Saude]

            const dadosAtualizados = await db.query(sql, values)
             
            return response.status(200).json({
                sucesso: true,
                mensagem: `Unidade de saúde ${ID_Unidade_Saude} atualizada com sucesso!`,
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

    async inserirUnidades_saude(request, response) {
        try {

            const {NM_Unidade_Saude} = request.body

            const sql = 'insert into Unidade_Saude (NM_Unidade_Saude) values (?)'

            const values = [NM_Unidade_Saude]
            

            const [results] = await db.query(sql, values)

            const NM_Unidade_SaudeId = results.insertId

            return response.status(200).json({

                sucesso: true,
                mensagem: 'Unidade de saúde inserida!',
                dados: NM_Unidade_SaudeId
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    },

    async excluirUnidades_saude(request, response) {
        try {
            const {ID_Unidade_Saude} = request.params

            const sql = 'delete from Unidade_Saude where ID_Unidade_Saude = ?'

            const values = [ID_Unidade_Saude]
            

            const [results] = await db.query(sql, values)

            if( results.affectedRows === 0 )
            {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Unidade de saúde ${ID_Unidade_Saude} não encontrada!`,
                    dados: null
                })
            }

            return response.status(200).json({

                sucesso: true,
                mensagem: `Unidade de saúde ${ID_Unidade_Saude} excluida com sucesso!`,
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