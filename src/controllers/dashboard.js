// src/controllers/dashboard.js
const db = require('../dataBase/connection');

module.exports = {
    async getMetricasAgente(request, response) {
        try {
            const { id_usuario } = request.params;

            // Validar se o usuário existe
            const usuarioSql = 'SELECT ID_Usuario, CD_Usuario, Matricula FROM usuario WHERE ID_Usuario = ?';
            const [usuarioRows] = await db.query(usuarioSql, [id_usuario]);

            if (usuarioRows.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuário não encontrado.',
                    dados: null
                });
            }

            const usuario = usuarioRows[0];

            // Buscar métricas das visitas do agente
            const metricasSql = `
                SELECT 
                    COUNT(*) as total_visitas,
                    SUM(CASE WHEN ST_Situacao = 'TRABALHADO' THEN 1 ELSE 0 END) as visitas_trabalhadas,
                    SUM(CASE WHEN ST_Situacao = 'FECHADO' THEN 1 ELSE 0 END) as visitas_fechadas,
                    SUM(CASE WHEN ST_Situacao = 'RECUSA' THEN 1 ELSE 0 END) as visitas_recusa,
                    SUM(CASE WHEN ST_Situacao IS NULL THEN 1 ELSE 0 END) as visitas_pendentes
                FROM visita 
                WHERE ID_Usuario = ? 
                AND MONTH(DT_Atendimento) = MONTH(CURRENT_DATE())
                AND YEAR(DT_Atendimento) = YEAR(CURRENT_DATE())
            `;

            const [metricasRows] = await db.query(metricasSql, [id_usuario]);
            const metricas = metricasRows[0];

            // Buscar dados da pessoa (nome do agente)
            const pessoaSql = 'SELECT NM_Pessoa FROM pessoa WHERE ID_Pessoa = ?';
            const [pessoaRows] = await db.query(pessoaSql, [id_usuario]);
            const nomeAgente = pessoaRows[0]?.NM_Pessoa || 'Agente';

            const dados = {
                agente: {
                    id: usuario.ID_Usuario,
                    nome: nomeAgente,
                    matricula: usuario.Matricula || '0000',
                    usuario: usuario.CD_Usuario
                },
                metricas: {
                    total: metricas.total_visitas || 0,
                    trabalhadas: metricas.visitas_trabalhadas || 0,
                    fechadas: metricas.visitas_fechadas || 0,
                    recusa: metricas.visitas_recusa || 0,
                    pendentes: metricas.visitas_pendentes || 0
                }
            };

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Métricas carregadas com sucesso',
                dados
            });

        } catch (error) {
            console.error('Erro ao buscar métricas:', error);
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao carregar métricas',
                dados: error.message
            });
        }
    },

    async getDadosAgente(request, response) {
        try {
            const { id_usuario } = request.params;

            const sql = `
                SELECT 
                    p.ID_Pessoa as id,
                    p.NM_Pessoa as nome,
                    u.Matricula,
                    u.CD_Usuario as usuario
                FROM usuario u
                INNER JOIN pessoa p ON p.ID_Pessoa = u.ID_Usuario
                WHERE u.ID_Usuario = ?
            `;

            const [rows] = await db.query(sql, [id_usuario]);

            if (rows.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Agente não encontrado',
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Dados do agente carregados',
                dados: rows[0]
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao carregar dados do agente',
                dados: error.message
            });
        }
    }
};