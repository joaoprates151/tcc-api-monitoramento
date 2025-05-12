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
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Inserir Colaborador.',
                dados:null
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
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Atualizar Colaborador.',
                dados:null
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