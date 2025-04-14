const db = require('../dataBase/connection');

module.exports = {
    async listarLocalidades(request, response) {
        try {

            const sql = 'SELECT Id_localidade, NM_Localidade, UF_Localidade FROM bd_tcc_infonet_224_monit_prev.localidade'

            const [rows] = await db.query(sql)
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Lista de Localidades',
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

    async atualizarLocalidades(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Atualizar de Localidades',
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

    async inserirLocalidades(request, response) {
        try {

            const {NM_Localidade, UF_Localidade} = request.body

            const sql = 'insert into localidade (NM_Localidade, UF_Localidade) values (?,?)'

            const values = [NM_Localidade, UF_Localidade]
            

            const [results] = await db.query(sql, values)

            const localidadeId = results.insertId

            return response.status(200).json({

                sucesso: true,
                mensagem: 'Localidades Inseridas',
                dados: localidadeId
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        } 
    },

    async excluirLocalidades(request, response) {
        try {
            return response.status(200).json({

                sucesso: true,
                mensagem: 'Excluir Localidades',
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