const db = require('../dataBase/connection');

module.exports ={
    async listarTipoRua(request, response){
        try {
            const sql = 'SELECT ID_Tipo_Rua, NM_Tipo_Rua FROM tipo_rua;';
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Tipos de Rua',
                itens: rows.length,
                dados: rows
            });

        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async cadastrarTipoRua(request, response){
        try {
            // Os campos que serão utilizados no Insominia
            const {NM_Tipo_Rua} = request.body;

            // Instrução SQl
            const sql = `INSERT INTO tipo_rua (NM_Tipo_Rua) 
                         VALUES (?);`;

            // Definição do valores do parâmetro
            const values = [NM_Tipo_Rua];

            // Executa o SQL
            const [result] = await db.query(sql, values);

            // Recupera o ID gerado
            const ID_Table = result.insertId;

            // Lista dos Dados Inseridos
            const dados = {
                ID_Tipo_Rua: ID_Table,
                NM_Tipo_Rua
            }
                
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Tipos de Rua Cadastro com Sucesso!',
                dados: dados
        });

        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async atualizarTipoRua(request, response){
        try {
            // Os campos que serão utilizados no Insominia
            const {NM_Tipo_Rua} = request.body;

            // Parametro recebido pela URL
            const {ID_Tipo_Rua} = request.params;

            // Instrução SQl
            const sql = `UPDATE tipo_rua 
                         SET NM_Tipo_Rua = ?
                         WHERE ID_Tipo_Rua = ?;`;

            // Definição do valores do parâmetro
            const values = [NM_Tipo_Rua,ID_Tipo_Rua];

            // Executa o SQL
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipos de Rua ${ID_Tipo_Rua} atualizado com sucesso!`,
                dados: atualizaDados[0].affectedRows
        });

        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async excluirTipoRua(request, response){
        try {
            // Os campos que serão utilizados no Insominia
            // const {nm_tipo_rua} = request.body;

            // Parametro recebido pela URL
            const {ID_Tipo_Rua} = request.params;

            // Instrução SQl
            const sql = `DELETE FROM tipo_rua 
                         WHERE ID_Tipo_Rua = ?;`;

            // Definição do valores do parâmetro
            const values = [ID_Tipo_Rua];

            // Executa o SQL
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipos de Rua ${ID_Tipo_Rua} excluído com sucesso!`,
                dados: excluir[0].affectedRows
        });

        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },
}