const db = require('../dataBase/connection');

module.exports ={
    async listarColaborador(request, response){
        try {

            const sql= 'SELECT ID_Colaborador, Matricula, SN_Temporario, DT_Cadastro, ID_Pessoa, ID_Funcao FROM colaborador;';
            
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Colaborador.',
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

    async inserirColaborador(request, response){
        try {

            const { Matricula, SN_Temporario, DT_Cadastro, ID_Pessoa, ID_Funcao, ID_Usuario_Cadastro}= request.body
            const sql= 'INSERT INTO COLABORADOR (Matricula, SN_Temporario, DT_Cadastro, ID_Pessoa, ID_Funcao,ID_Usuario_Cadastro) value (?,?,?,?,?,?)';

            const values = [Matricula, SN_Temporario, DT_Cadastro, ID_Pessoa, ID_Funcao, ID_Usuario_Cadastro]
            
            const [ressults] = await db.query(sql, values);

            const colaborador_id = ressults.insertId

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Inserir Colaborador.',
                dados:colaborador_id
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensage
            });
        }
    },

    async atualizarColaborador(request, response){
        try {

                    const { Matricula, SN_Temporario, DT_Cadastro, ID_Pessoa, ID_Funcao,ID_Usuario_Cadastro}= request.body
        
                    const { id } = request.params;
        
                    const sql= 'UPDATE usuario SET  Matricula =?, SN_Temporario =?, DT_Cadastro =?, ID_Pessoa =?, ID_Funcao =?,ID_Usuario_Cadastro =? WHERE ID_Colaborador = ?';
                
                    const values = [ Matricula, SN_Temporario, DT_Cadastro, ID_Pessoa, ID_Funcao,ID_Usuario_Cadastro, id]
        
                    const atualizarDados = await db.query(sql, values);
        
            return response.status(200).json({
                sucesso: true,
                mensagem: `Colaborador ${id} Atualização de Colaboradores!`,
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

    async excluirColaborador(request, response){
        try {
            const { id } = request.params;
            const sql= 'DELETE FROM colaborador WHERE ID_Colaborador = ?';
            const values = [ id ]
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Colaborador não encontrado.',
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Excluir Colaborador.',
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