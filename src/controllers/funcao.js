const db = require('../dataBase/connection');

module.exports ={
    async listarFuncao(request, response){
        try {

            const sql= 'SELECT ID_Funcao, NM_Funcao, SN_Agente_Comunitario FROM funcao; ';
            
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Função.',
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

    async inserirFuncao(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Inserir Função.',
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

    async atualizarFuncao(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Atualizar Função.',
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

    async excluirFuncao(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Excluir Função.',
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