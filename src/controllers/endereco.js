const db = require('../dataBase/connection');

module.exports ={
    async listarEndereco(request, response){
        try {

            const sql= 'SELECT ID_Endereco, ID_Pessoa, ID_Rua, NO_Imovel, complemento, DS_Ponto_Referencia, LA_Latitude, LO_Longitude FROM enderecos;';
            
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
                dados: error.message
            });
        }
    },

      async inserirEndereco(request, response){
        try {

            const { ID_Endereco, ID_Pessoa, ID_Rua, NO_Imovel, complemento, DS_Ponto_Referencia, LA_Latitude, LO_Longitude }= request.body
            const sql= 'INSERT INTO Enderecos (ID_Endereco, ID_Pessoa, ID_Rua, NO_Imovel, complemento, DS_Ponto_Referencia, LA_Latitude, LO_Longitude) values (?,?,?,?,?,?,?,?)';

            const values = [ID_Endereco, ID_Pessoa, ID_Rua, NO_Imovel, complemento, DS_Ponto_Referencia, LA_Latitude, LO_Longitude]
            
            const [results] = await db.query(sql, values);

            const endereco_id = results.insertId

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Endereço Inserido',
                dados: endereco_id 
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async atualizarEndereco(request, response){
        try {

            const { ID_Pessoa, ID_Rua, NO_Imovel, complemento, DS_Ponto_Referencia, LA_Latitude, LO_Longitude}= request.body

            const { ID_Endereco } = request.params;

            const sql= 'UPDATE Enderecos SET ID_Pessoa= ?, ID_Rua= ?, NO_Imovel= ?, complemento= ?, DS_Ponto_Referencia= ?, LA_Latitude= ?, LO_Longitude= ? WHERE ID_Endereco = ?';
        
            const values = [ ID_Pessoa, ID_Rua, NO_Imovel, complemento, DS_Ponto_Referencia, LA_Latitude, LO_Longitude, ID_Endereco]

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
                dados: error.message
            });
        }
    },

    async excluirEndereco(request, response){
        try {
            const { ID_Endereco } = request.params;
            const sql= 'DELETE FROM Enderecos WHERE ID_Endereco = ?';
            const values = [ ID_Endereco ]
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
                dados: error.message
            });
        }
    }
}