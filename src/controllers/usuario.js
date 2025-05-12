const db = require('../dataBase/connection');

module.exports ={
    async listarUsuarios(request, response){
        try {

            const sql= 'SELECT ID_Usuario, CD_Usuario, Senha, DT_Cadastro,DH_Acesso, DT_Vigencia, SN_Bloqueado, ID_Pessoa FROM usuario;';
            
            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Usuários.',
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

    async inserirUsuarios(request, response){
        try {
            const { CD_Usuario, Senha, DT_Cadastro,DH_Acesso, DT_Vigencia, SN_Bloqueado, ID_Pessoa}= request.body
            const sql= 'INSERT INTO USUARIO (CD_Usuario, Senha, DT_Cadastro,DH_Acesso, DT_Vigencia, SN_Bloqueado, ID_Pessoa) value(?,?,?,?,?,?,?) ';

            const values = [ CD_Usuario, Senha, DT_Cadastro,DH_Acesso, DT_Vigencia, SN_Bloqueado, ID_Pessoa]
            
            const [ressults] = await db.query(sql, values);

            const usuario_id = ressults.insertId

            
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Usuarios com sucesso.',
                dados:usuario_id
            });
        }catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensage
            });
        }
    },

    async atualizarUsuarios(request, response){
        try {

            const { CD_Usuario, Senha, DT_Cadastro,DH_Acesso, DT_Vigencia, SN_Bloqueado, ID_Pessoa}= request.body

            const { id } = request.params;

            const sql= 'UPDATE usuario SET  CD_Usuario = ?, Senha= ?, DT_Cadastro = ?,DH_Acesso = ?, DT_Vigencia = ?, SN_Bloqueado = ?, ID_Pessoa =? WHERE ID_Usuario = ?';
        
            const values = [ CD_Usuario, Senha, DT_Cadastro,DH_Acesso, DT_Vigencia, SN_Bloqueado, ID_Pessoa, id]

            const atualizarDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuario ${id} Atualização de Usuários!`,
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

    async excluirUsuarios(request, response){
        try {
            const { id } = request.params;
            const sql= 'DELETE FROM usuario WHERE ID_Usuario = ?';
            const values = [ id ]
            const [result] = await db.query(sql, values);

            if (result.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuario não encontrado.',
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Excluir Usuários.',
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