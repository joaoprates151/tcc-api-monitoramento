const db = require('../dataBase/connection');

module.exports = {
    async listarTipo_ocorrencias(request, response) {
        try {

            const sql = 'SELECT ID_Tipo_Ocorrencia, NM_Tipo_Ocorrencia, DT_Cadastro, Icone, Cor FROM tipo_ocorrencia;'

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

            const { NM_Tipo_Ocorrencia, DT_Cadastro, Icone, Cor } = request.body
            const { ID_Tipo_Ocorrencia } = request.params

            const sql = 'update tipo_ocorrencia set NM_Tipo_Ocorrencia = ?, DT_Cadastro = ?,  Icone = ?, Cor = ? where ID_Tipo_Ocorrencia = ?'

            const values = [NM_Tipo_Ocorrencia, DT_Cadastro, Icone, Cor, ID_Tipo_Ocorrencia]

            const dadosAtualizados = await db.query(sql, values)

            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipo Ocorrência ${ID_Tipo_Ocorrencia} atualizado com sucesso!`,
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

    async inserirTipo_ocorrencias(request, response) {
        try {

            const { NM_Tipo_Ocorrencia, DT_Cadastro, Icone, Cor } = request.body

            const sql = 'insert into tipo_ocorrencia (NM_Tipo_Ocorrencia, DT_Cadastro, Icone, Cor) values (?,?,?,?)'

            const values = [NM_Tipo_Ocorrencia, DT_Cadastro, Icone, Cor]


            const [results] = await db.query(sql, values)

            const Tipo_ocorrenciaId = results.insertId

            return response.status(200).json({

                sucesso: true,
                mensagem: 'Tipo Ocorrência Inseridas',
                dados: Tipo_ocorrenciaId
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
            const { ID_Tipo_Ocorrencia } = request.params

            const sql = 'delete from tipo_ocorrencia where ID_Tipo_Ocorrencia = ?'

            const values = [ID_Tipo_Ocorrencia]


            const [results] = await db.query(sql, values)

            if (results.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Tipo Ocorrência ${ID_Tipo_Ocorrencia} não encontrado!`,
                    dados: null
                })
            }

            return response.status(200).json({

                sucesso: true,
                mensagem: `Tipo Ocorrência ${ID_Tipo_Ocorrencia} excluida com sucesso!`,
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