const db = require('../dataBase/connection');

module.exports = {
    async login(request, response) {
        try {
            const { usuario, senha } = request.body;

            const sql = `
        SELECT
            u.ID_Usuario,
            p.NM_Pessoa,
            u.CD_Usuario,
            u.Senha,
            u.SN_Bloqueado
        FROM
            usuario u
        INNER JOIN
            pessoa p ON p.ID_Pessoa = u.ID_Usuario
        WHERE
            u.CD_Usuario = ? AND u.Senha = ? AND u.SN_Bloqueado = 'N'
        `;

            const values = [usuario, senha];
            const [rows] = await db.query(sql, values);
            const nItems = rows.length;

            if (nItems < 1) {
                return response.status(403).json({
                    sucesso: false,
                    mensagem: 'Usuário e/ou senha inválido.',
                    dados: null,
                });
            }

            const dados = rows.map(user => ({
                id: user.ID_Usuario,
                nome: user.NM_Pessoa,
                usuario: user.CD_Usuario
            }));

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Login efetuado com sucesso',
                dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        }
    },

    async buscarUsuarioPorId(request, response) {
        try {
            const { id } = request.params;

            const sql = `
            SELECT
                u.ID_Usuario,
                p.NM_Pessoa,
                u.CD_Usuario,
                u.DT_Cadastro,
                u.Matricula,
                f.NM_Funcao
            FROM
                usuario u
            INNER JOIN
                pessoa p ON p.ID_Pessoa = u.ID_Usuario
            INNER JOIN
                funcao f ON f.ID_Funcao = u.ID_Funcao
            WHERE
                u.ID_Usuario = ?
        `;

            const [rows] = await db.query(sql, [id]);
            const nItems = rows.length;

            if (nItems < 1) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado.',
                    dados: null,
                });
            }

            const dados = rows.map(user => ({
                id: user.ID_Usuario,
                nome: user.NM_Pessoa,
                usuario: user.CD_Usuario,
                matricula: user.Matricula,
                funcao: user.NM_Funcao,
                dataCadastro: user.DT_Cadastro
            }))[0];

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Usuário encontrado.',
                dados
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        }
    },

    async listarUsuarios(request, response) {
        try {

            const sql = 'SELECT ID_Usuario, CD_Usuario, Senha, DT_Cadastro,DH_Acesso, DT_Vigencia, SN_Bloqueado, Matricula, SN_Temporario, ID_Funcao FROM usuario;';

            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Usuários.',
                itens: rows.length,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async inserirUsuarios(request, response) {
        try {
            const { ID_Usuario, CD_Usuario, Senha, DT_Cadastro, DH_Acesso, DT_Vigencia, SN_Bloqueado, Matricula, SN_Temporario, ID_Funcao } = request.body
            const sql = 'INSERT INTO usuario (ID_Usuario, CD_Usuario, Senha, DT_Cadastro, DH_Acesso, DT_Vigencia, SN_Bloqueado, Matricula, SN_Temporario, ID_Funcao) value(?,?,?,?,?,?,?,?,?,?) ';

            const values = [ID_Usuario, CD_Usuario, Senha, DT_Cadastro, DH_Acesso, DT_Vigencia, SN_Bloqueado, Matricula, SN_Temporario, ID_Funcao]

            const [results] = await db.query(sql, values);

            const usuario_id = results.insertId


            return response.status(200).json({
                sucesso: true,
                mensagem: 'Usuarios com sucesso.',
                dados: usuario_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async atualizarUsuarios(request, response) {
        try {

            const { ID_Usuario, CD_Usuario, Senha, DT_Cadastro, DH_Acesso, DT_Vigencia, SN_Bloqueado, Matricula, SN_Temporario, ID_Funcao } = request.body

            const { id } = request.params;

            const sql = 'UPDATE usuario SET  ID_Usuario = ?,CD_Usuario=?, Senha= ?, DT_Cadastro = ?,DH_Acesso = ?, DT_Vigencia = ?, SN_Bloqueado = ?, Matricula = ?, SN_Temporario = ?, ID_Funcao = ? WHERE ID_Usuario = ?';

            const values = [ID_Usuario, CD_Usuario, Senha, DT_Cadastro, DH_Acesso, DT_Vigencia, SN_Bloqueado, Matricula, SN_Temporario, ID_Funcao, id]

            const atualizarDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuario ${id} Atualização de Usuários!`,
                dados: atualizarDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async excluirUsuarios(request, response) {
        try {
            const { id } = request.params;
            const sql = 'DELETE FROM usuario WHERE ID_Usuario = ?';
            const values = [id]
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
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
}