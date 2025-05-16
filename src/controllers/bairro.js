const db = require('../dataBase/connection');

module.exports = {

    async listarBairros(request, response){
        try{

            const sql = 'SELECT ID_Bairro, NM_Bairro, ID_Setor FROM bairro;' ;

            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Bairros.',
                itens: rows.length,
                dados: rows
            });
        } catch (error){
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async inserirBairros(request, response){
        try {
            const { nm_bairro, id_setor } = request.body;

            const sql = `
                 INSERT INTO bairro
                     (NM_Bairro, ID_Setor)
                 VALUE
                     (?,?)`;

            const values = [ nm_bairro, id_setor];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId
                //nm_bairro,
                //id_setor
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Inserção realizada.',
                dados: dados
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensage
            });
        }
    },

    async atualizarBairros(request, response){
        try {
            const { nm_bairro, id_setor } = request.body;

            const { id } = request.params;

            const sql = `
                UPDATE bairro SET
                    NM_bairro = ?, ID_setor = ?
                WHERE
                    ID_bairro = ?;
            `;

            const values = [nm_bairro, id_setor, id];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Bairro ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                id,
                nm_bairro,
                id_setor
            };
            
            return response.status(200).json({
                sucesso: true,
                mensagem: `Bairro ${id} atualizado com sucesso!`,
                dados
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensage
            });
        }
    },

    async excluirBairros(request, response){
        try {
            // Parametro passado via url na chamada da api pelo front-end
            const { id } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM bairro WHERE ID_Bairro = ?`;
            // array com parametro de exclusão
            const values = [id];
            // executa instrução no banco de dados
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Bairro ${ID_Bairro} não encontrado!`,
                    dados: null
                });
            }


            return response.status(200).json({
                sucesso: true,
                mensagem: `Bairro ${id} excluído com sucesso.`,
                dados:null
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensage
            });
        }
    }

    
}