const db = require('../dataBase/connection');

module.exports ={
    async listarEndereco(request, response){
        try {

            const sql= 'SELECT ID_Endereco, ID_Pessoa, ID_rua, NO_Imovel, complemento, DS_Ponto_Referecia, LA_Latitude, LO_Longitude FROM endereco; ';
            
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Endereços.',
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

      async inserirEndereco(request, response){
        try {

            const { ID_Endereco, ID_Pessoa, ID_rua, NO_Imovel, complemento, DS_Ponto_Referecia, LA_Latitude, LO_Longitude }= request.body
            const sql= 'INSERT INTO Endereco (ID_Endereco, ID_Pessoa, ID_rua, NO_Imovel, complemento, DS_Ponto_Referecia, LA_Latitude, LO_Longitude) value (?,?,?,?,?,?,?,?)';

            const values = [ID_Endereco, ID_Pessoa, ID_rua, NO_Imovel, complemento, DS_Ponto_Referecia, LA_Latitude, LO_Longitude]
            
            const [ressults] = await db.query(sql, values);

            const rua_id = ressults.insertId

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Endereço Inserido',
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

    async atualizarEndereco(request, response){
        try {

            const { ID_Pessoa, ID_rua, NO_Imovel, complemento, DS_Ponto_Referecia, LA_Latitude, LO_Longitude}= request.body

            const { ID_Endereco } = request.params;

            const sql= 'UPDATE Endereco SET ID_Pessoa= ?, ID_rua= ?, NO_Imovel= ?, complemento= ?, DS_Ponto_Referecia= ?, LA_Latitude= ?, LO_Longitude= ?';
        
            const values = [ ID_Pessoa, ID_rua, NO_Imovel, complemento, DS_Ponto_Referecia, LA_Latitude, LO_Longitude ]

            const atualizarDados = await db.query(sql, values);
        
            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereço ${ID_Endereco} atualizado com sucesso!`,
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

    async excluirEndereco(request, response){
        try {
            const { ID_Rua } = request.params;
            const sql= 'DELETE FROM enderco WHERE ID_Endereco = ?';
            const values = [ ID_Rua ]
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Endereço não encontrado.',
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Endereço excluído',
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