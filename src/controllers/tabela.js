const db = require('../dataBase/connection');

module.exports = {

    async listarTabelas(request, response){
        try{

            const sql = `SELECT ID_Tabela, NM_Fisico, NM_Logico FROM tabela;` ;

            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Tabelas.',
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

    async inserirTabelas(request, response){
        try {
            const { NM_Fisico, NM_Logico } = request.body;

            const sql = `
                 INSERT INTO tabela
                     (NM_Fisico, NM_Logico)
                 VALUE
                     (?,?)`;

            const values = [ NM_Fisico, NM_Logico];

            const [result] = await db.query(sql, values);

            const dados = {
                id: result.insertId
                //NM_Fisico,
                //NM_Logico,
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

    async atualizarTabelas(request, response){
        try {
            const { NM_Fisico, NM_Logico } = request.body;

            const { id } = request.params;

            const sql = `
                UPDATE tabela SET
                    NM_Fisico = ?, NM_Logico = ?
                WHERE
                    ID_Tabela = ?;
            `;

            const values = [ NM_Fisico, NM_Logico, id ];

            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Tabela ${id} não encontrado!`,
                    dados: null
                });
            }

            const dados = {
                id,
                NM_Fisico, 
                NM_Logico
            };
            
            return response.status(200).json({
                sucesso: true,
                mensagem: `Tabela ${id} atualizado com sucesso!`,
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

    async excluirTabelas(request, response){
        try {
            // Parametro passado via url na chamada da api pelo front-end
            const { id } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM tabela WHERE ID_Tabela = ?`;
            // array com parametro de exclusão
            const values = [id];
            // executa instrução no banco de dados
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0){
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Tabela ${ID_Tabela} não encontrado!`,
                    dados: null
                });
            }


            return response.status(200).json({
                sucesso: true,
                mensagem: `Tabela ${id} excluída com sucesso.`,
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