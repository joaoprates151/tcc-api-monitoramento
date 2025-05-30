const db = require('../dataBase/connection');

module.exports ={
    async listarRua(request, response){
        try {

            const sql= 'SELECT ID_Rua, NM_Rua, CEP, Numeracao, ID_Bairro, ID_Localidade, ID_Tipo_rua FROM rua;';
            
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Ruas',
                itens: rows.length,
                dados: rows
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensage
            });
        }
    },

    async inserirRua(request, response){
        try {

            const { NM_Rua, CEP, Numeracao, ID_Bairro, ID_Localidade, ID_Tipo_rua }= request.body
            const sql= 'INSERT INTO Rua (NM_Rua, CEP, Numeracao, ID_Bairro, ID_Localidade, ID_Tipo_rua) value (?,?,?,?,?,?)';

            const values = [NM_Rua, CEP, Numeracao, ID_Bairro, ID_Localidade, ID_Tipo_rua]
            
            const [ressults] = await db.query(sql, values);

            const rua_id = ressults.insertId

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Rua Inserida',
                dados: rua_id 
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensage
            });
        }
    },

    async atualizarRua(request, response){
        try {

            const {NM_Rua, CEP, Numeracao, ID_Bairro, ID_Localidade, ID_Tipo_rua}= request.body

            const { ID_Rua } = request.params;

            const sql= 'UPDATE Rua SET  NM_Rua =?, CEP =?, Numeracao =?, ID_Bairro =?, ID_Localidade =?,ID_Tipo_rua =? WHERE ID_Rua = ?';
        
            const values = [ NM_Rua, CEP, Numeracao, ID_Bairro, ID_Localidade, ID_Tipo_rua, ID_Rua ]

            const atualizarDados = await db.query(sql, values);
        
            return response.status(200).json({
                sucesso: true,
                mensagem: `Rua ${ID_Rua} atualizada com sucesso!`,
                dados: atualizarDados[0].affectedRows
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensage
            });
        }
    },

    async excluirRua(request, response){
        try {
            const { ID_Rua } = request.params;
            const sql= 'DELETE FROM rua WHERE ID_Rua = ?';
            const values = [ ID_Rua ]
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Rua não encontrada.',
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Rua excluída',
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