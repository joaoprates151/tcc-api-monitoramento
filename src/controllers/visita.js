// src/controllers/visita.js
const db = require('../dataBase/connection');

module.exports = {
    // Listar todas as visitas
    async listarVisitas(request, response) {
        try {
            const sql = `
        SELECT 
          v.ID_Visita,
          v.ID_Usuario,
          v.DT_Cadastro,
          v.DT_Solicitacao,
          v.DT_Atendimento,
          v.ID_Unidade_Saude,
          v.ID_Pessoa,
          v.ID_Endereco,
          v.ST_Imovel,
          v.ST_Situacao,
          v.QT_Amostra_Coletada,
          v.SN_Acidente,
          v.SN_Demanda_Expontanea,
          v.DS_Observacao,
          v.SN_Agenda_Retorno,
          v.DT_Retono,
          v.ST_Status,
          v.Assinatura_Base64,
          p.NM_Pessoa as nome_proprietario,
          u.NM_Unidade_Saude,
          e.NO_Imovel,
          e.Complemento,
          e.DS_Ponto_Referencia,
          e.LA_Latitude,
          e.LO_Longitude,
          r.NM_Rua,
          r.CEP,
          b.NM_Bairro,
          l.NM_Localidade,
          l.UF_Localidade,
          vi.ID_Tipo_Ocorrencia,
          t.NM_Tipo_Ocorrencia,
          up.NM_Pessoa as nome_agente
        FROM visita v
        LEFT JOIN pessoa p ON p.ID_Pessoa = v.ID_Pessoa
        LEFT JOIN unidade_saude u ON u.ID_Unidade_Saude = v.ID_Unidade_Saude
        LEFT JOIN enderecos e ON e.ID_Endereco = v.ID_Endereco
        LEFT JOIN rua r ON r.ID_Rua = e.ID_Rua
        LEFT JOIN bairro b ON b.ID_Bairro = r.ID_Bairro
        LEFT JOIN localidade l ON l.ID_Localidade = r.ID_Localidade
        LEFT JOIN visita_item vi ON vi.ID_Visita = v.ID_Visita
        LEFT JOIN tipo_ocorrencia t ON t.ID_Tipo_Ocorrencia = vi.ID_Tipo_Ocorrencia
        LEFT JOIN usuario us ON us.ID_Usuario = v.ID_Usuario
        LEFT JOIN pessoa up ON up.ID_Pessoa = us.ID_Usuario
        ORDER BY v.DT_Atendimento DESC
      `;

            const [rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Visitas',
                itens: rows.length,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        }
    },

    // Listar visitas por usuário
    async listarVisitasPorUsuario(request, response) {
        try {
            const { idUsuario } = request.params;

            const sql = `
        SELECT 
          v.ID_Visita,
          v.ID_Usuario,
          v.DT_Cadastro,
          v.DT_Solicitacao,
          v.DT_Atendimento,
          v.ID_Unidade_Saude,
          v.ID_Pessoa,
          v.ID_Endereco,
          v.ST_Imovel,
          v.ST_Situacao,
          v.QT_Amostra_Coletada,
          v.SN_Acidente,
          v.SN_Demanda_Expontanea,
          v.DS_Observacao,
          v.SN_Agenda_Retorno,
          v.DT_Retono,
          v.ST_Status,
          v.Assinatura_Base64,
          p.NM_Pessoa as nome_proprietario,
          u.NM_Unidade_Saude,
          e.NO_Imovel,
          e.Complemento,
          e.DS_Ponto_Referencia,
          e.LA_Latitude,
          e.LO_Longitude,
          r.NM_Rua,
          r.CEP,
          b.NM_Bairro,
          l.NM_Localidade,
          l.UF_Localidade,
          vi.ID_Tipo_Ocorrencia,
          t.NM_Tipo_Ocorrencia,
          up.NM_Pessoa as nome_agente
        FROM visita v
        LEFT JOIN pessoa p ON p.ID_Pessoa = v.ID_Pessoa
        LEFT JOIN unidade_saude u ON u.ID_Unidade_Saude = v.ID_Unidade_Saude
        LEFT JOIN enderecos e ON e.ID_Endereco = v.ID_Endereco
        LEFT JOIN rua r ON r.ID_Rua = e.ID_Rua
        LEFT JOIN bairro b ON b.ID_Bairro = r.ID_Bairro
        LEFT JOIN localidade l ON l.ID_Localidade = r.ID_Localidade
        LEFT JOIN visita_item vi ON vi.ID_Visita = v.ID_Visita
        LEFT JOIN tipo_ocorrencia t ON t.ID_Tipo_Ocorrencia = vi.ID_Tipo_Ocorrencia
        LEFT JOIN usuario us ON us.ID_Usuario = v.ID_Usuario
        LEFT JOIN pessoa up ON up.ID_Pessoa = us.ID_Usuario
        WHERE v.ID_Usuario = ?
        ORDER BY v.DT_Atendimento DESC
      `;

            const [rows] = await db.query(sql, [idUsuario]);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Visitas do usuário',
                itens: rows.length,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        }
    },

    // Listar visitas do dia por usuário
    async listarVisitasDoDia(request, response) {
        try {
            const { idUsuario } = request.params;
            const { data } = request.query;

            const dataBusca = data || new Date().toISOString().split('T')[0];

            const sql = `
        SELECT 
          v.ID_Visita,
          v.ID_Usuario,
          v.DT_Cadastro,
          v.DT_Solicitacao,
          v.DT_Atendimento,
          v.ID_Unidade_Saude,
          v.ID_Pessoa,
          v.ID_Endereco,
          v.ST_Imovel,
          v.ST_Situacao,
          v.QT_Amostra_Coletada,
          v.SN_Acidente,
          v.SN_Demanda_Expontanea,
          v.DS_Observacao,
          v.SN_Agenda_Retorno,
          v.DT_Retono,
          v.ST_Status,
          v.Assinatura_Base64,
          p.NM_Pessoa as nome_proprietario,
          u.NM_Unidade_Saude,
          e.NO_Imovel,
          e.Complemento,
          e.DS_Ponto_Referencia,
          e.LA_Latitude,
          e.LO_Longitude,
          r.NM_Rua,
          r.CEP,
          b.NM_Bairro,
          l.NM_Localidade,
          l.UF_Localidade,
          vi.ID_Tipo_Ocorrencia,
          t.NM_Tipo_Ocorrencia,
          up.NM_Pessoa as nome_agente
        FROM visita v
        LEFT JOIN pessoa p ON p.ID_Pessoa = v.ID_Pessoa
        LEFT JOIN unidade_saude u ON u.ID_Unidade_Saude = v.ID_Unidade_Saude
        LEFT JOIN enderecos e ON e.ID_Endereco = v.ID_Endereco
        LEFT JOIN rua r ON r.ID_Rua = e.ID_Rua
        LEFT JOIN bairro b ON b.ID_Bairro = r.ID_Bairro
        LEFT JOIN localidade l ON l.ID_Localidade = r.ID_Localidade
        LEFT JOIN visita_item vi ON vi.ID_Visita = v.ID_Visita
        LEFT JOIN tipo_ocorrencia t ON t.ID_Tipo_Ocorrencia = vi.ID_Tipo_Ocorrencia
        LEFT JOIN usuario us ON us.ID_Usuario = v.ID_Usuario
        LEFT JOIN pessoa up ON up.ID_Pessoa = us.ID_Usuario
        WHERE v.ID_Usuario = ? AND DATE(v.DT_Atendimento) = ?
        ORDER BY v.DT_Atendimento DESC
      `;

            const [rows] = await db.query(sql, [idUsuario, dataBusca]);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Visitas do dia',
                itens: rows.length,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        }
    },

    // Buscar visita por ID
    async buscarVisitaPorId(request, response) {
        try {
            const { idVisita } = request.params;

            const sql = `
        SELECT 
          v.*,
          p.NM_Pessoa as nome_proprietario,
          u.NM_Unidade_Saude,
          e.*,
          r.*,
          b.NM_Bairro,
          l.NM_Localidade,
          l.UF_Localidade,
          vi.ID_Tipo_Ocorrencia,
          t.NM_Tipo_Ocorrencia,
          up.NM_Pessoa as nome_agente
        FROM visita v
        LEFT JOIN pessoa p ON p.ID_Pessoa = v.ID_Pessoa
        LEFT JOIN unidade_saude u ON u.ID_Unidade_Saude = v.ID_Unidade_Saude
        LEFT JOIN enderecos e ON e.ID_Endereco = v.ID_Endereco
        LEFT JOIN rua r ON r.ID_Rua = e.ID_Rua
        LEFT JOIN bairro b ON b.ID_Bairro = r.ID_Bairro
        LEFT JOIN localidade l ON l.ID_Localidade = r.ID_Localidade
        LEFT JOIN visita_item vi ON vi.ID_Visita = v.ID_Visita
        LEFT JOIN tipo_ocorrencia t ON t.ID_Tipo_Ocorrencia = vi.ID_Tipo_Ocorrencia
        LEFT JOIN usuario us ON us.ID_Usuario = v.ID_Usuario
        LEFT JOIN pessoa up ON up.ID_Pessoa = us.ID_Usuario
        WHERE v.ID_Visita = ?
      `;

            const [rows] = await db.query(sql, [idVisita]);

            if (rows.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Visita não encontrada',
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Visita encontrada',
                dados: rows[0]
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição',
                dados: error.message
            });
        }
    },

    // Cadastrar nova visita
    async cadastrarVisita(request, response) {
        try {
            const {
                ID_Usuario,
                DT_Atendimento,
                ID_Unidade_Saude,
                ST_Imovel,
                ST_Situacao,
                SN_Acidente,
                SN_Demanda_Expontanea,
                DS_Observacao,
                SN_Agenda_Retorno,
                endereco,
                visita_itens
            } = request.body;

            // Iniciar transação
            await db.query('START TRANSACTION');

            try {
                // 1. Inserir endereço
                const enderecoSql = `
          INSERT INTO enderecos (ID_Pessoa, ID_Rua, NO_Imovel, Complemento, DS_Ponto_Referencia, LA_Latitude, LO_Longitude)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

                const [enderecoResult] = await db.query(enderecoSql, [
                    null, // ID_Pessoa pode ser null inicialmente
                    endereco.rua.ID_Rua || 1, // Usar ID da rua existente ou padrão
                    endereco.NO_Imovel,
                    endereco.Complemento,
                    endereco.DS_Ponto_Referencia,
                    endereco.LA_Latitude,
                    endereco.LO_Longitude
                ]);

                const ID_Endereco = enderecoResult.insertId;

                // 2. Inserir visita
                const visitaSql = `
          INSERT INTO visita (
            ID_Usuario, DT_Cadastro, DT_Solicitacao, DT_Atendimento, ID_Unidade_Saude,
            ID_Pessoa, ID_Endereco, ST_Imovel, ST_Situacao, QT_Amostra_Coletada,
            SN_Acidente, SN_Demanda_Expontanea, DS_Observacao, SN_Agenda_Retorno,
            DT_Retono, ST_Status, Assinatura_Base64
          ) VALUES (?, NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

                const [visitaResult] = await db.query(visitaSql, [
                    ID_Usuario,
                    DT_Atendimento,
                    ID_Unidade_Saude,
                    null, // ID_Pessoa (proprietário) - pode ser null
                    ID_Endereco,
                    ST_Imovel,
                    ST_Situacao,
                    null, // QT_Amostra_Coletada
                    SN_Acidente,
                    SN_Demanda_Expontanea,
                    DS_Observacao,
                    SN_Agenda_Retorno,
                    null, // DT_Retono
                    'A', // ST_Status - Ativo
                    null // Assinatura_Base64
                ]);

                const ID_Visita = visitaResult.insertId;

                // 3. Inserir itens da visita (ocorrências)
                if (visita_itens && visita_itens.length > 0) {
                    for (const item of visita_itens) {
                        const itemSql = `
              INSERT INTO visita_item (ID_Visita, ID_Tipo_Ocorrencia, SINAN, DS_Ocorrencia)
              VALUES (?, ?, ?, ?)
            `;
                        await db.query(itemSql, [
                            ID_Visita,
                            item.ID_Tipo_Ocorrencia,
                            item.SINAN || null,
                            item.DS_Ocorrencia
                        ]);
                    }
                }

                // Commit da transação
                await db.query('COMMIT');

                return response.status(200).json({
                    sucesso: true,
                    mensagem: 'Visita cadastrada com sucesso',
                    dados: { ID_Visita }
                });

            } catch (error) {
                // Rollback em caso de erro
                await db.query('ROLLBACK');
                throw error;
            }

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar visita',
                dados: error.message
            });
        }
    },

    // Atualizar visita
    async atualizarVisita(request, response) {
        try {
            const { idVisita } = request.params;
            const {
                DT_Atendimento,
                ID_Unidade_Saude,
                ST_Imovel,
                ST_Situacao,
                SN_Acidente,
                SN_Demanda_Expontanea,
                DS_Observacao,
                SN_Agenda_Retorno,
                endereco,
                visita_itens
            } = request.body;

            await db.query('START TRANSACTION');

            try {
                // 1. Atualizar visita
                const visitaSql = `
          UPDATE visita SET
            DT_Atendimento = ?,
            ID_Unidade_Saude = ?,
            ST_Imovel = ?,
            ST_Situacao = ?,
            SN_Acidente = ?,
            SN_Demanda_Expontanea = ?,
            DS_Observacao = ?,
            SN_Agenda_Retorno = ?
          WHERE ID_Visita = ?
        `;

                await db.query(visitaSql, [
                    DT_Atendimento,
                    ID_Unidade_Saude,
                    ST_Imovel,
                    ST_Situacao,
                    SN_Acidente,
                    SN_Demanda_Expontanea,
                    DS_Observacao,
                    SN_Agenda_Retorno,
                    idVisita
                ]);

                // 2. Atualizar endereço se fornecido
                if (endereco) {
                    const enderecoSql = `
            UPDATE enderecos SET
              NO_Imovel = ?,
              Complemento = ?,
              DS_Ponto_Referencia = ?,
              LA_Latitude = ?,
              LO_Longitude = ?
            WHERE ID_Endereco = (SELECT ID_Endereco FROM visita WHERE ID_Visita = ?)
          `;

                    await db.query(enderecoSql, [
                        endereco.NO_Imovel,
                        endereco.Complemento,
                        endereco.DS_Ponto_Referencia,
                        endereco.LA_Latitude,
                        endereco.LO_Longitude,
                        idVisita
                    ]);
                }

                // 3. Atualizar itens da visita
                if (visita_itens) {
                    // Remover itens existentes
                    await db.query('DELETE FROM visita_item WHERE ID_Visita = ?', [idVisita]);

                    // Inserir novos itens
                    if (visita_itens.length > 0) {
                        for (const item of visita_itens) {
                            const itemSql = `
                INSERT INTO visita_item (ID_Visita, ID_Tipo_Ocorrencia, SINAN, DS_Ocorrencia)
                VALUES (?, ?, ?, ?)
              `;
                            await db.query(itemSql, [
                                idVisita,
                                item.ID_Tipo_Ocorrencia,
                                item.SINAN || null,
                                item.DS_Ocorrencia
                            ]);
                        }
                    }
                }

                await db.query('COMMIT');

                return response.status(200).json({
                    sucesso: true,
                    mensagem: 'Visita atualizada com sucesso',
                    dados: null
                });

            } catch (error) {
                await db.query('ROLLBACK');
                throw error;
            }

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar visita',
                dados: error.message
            });
        }
    },

    // Excluir visita
    async excluirVisita(request, response) {
        try {
            const { idVisita } = request.params;

            await db.query('START TRANSACTION');

            try {
                // 1. Buscar ID do endereço antes de excluir
                const [visitaRows] = await db.query(
                    'SELECT ID_Endereco FROM visita WHERE ID_Visita = ?',
                    [idVisita]
                );

                if (visitaRows.length === 0) {
                    return response.status(404).json({
                        sucesso: false,
                        mensagem: 'Visita não encontrada',
                        dados: null
                    });
                }

                const ID_Endereco = visitaRows[0].ID_Endereco;

                // 2. Excluir itens da visita (CASCADE deve lidar com isso, mas fazemos explicitamente)
                await db.query('DELETE FROM visita_item WHERE ID_Visita = ?', [idVisita]);

                // 3. Excluir visita
                await db.query('DELETE FROM visita WHERE ID_Visita = ?', [idVisita]);

                // 4. Excluir endereço (se não estiver sendo usado por outras visitas)
                const [enderecoUso] = await db.query(
                    'SELECT COUNT(*) as total FROM visita WHERE ID_Endereco = ?',
                    [ID_Endereco]
                );

                if (enderecoUso[0].total === 0) {
                    await db.query('DELETE FROM enderecos WHERE ID_Endereco = ?', [ID_Endereco]);
                }

                await db.query('COMMIT');

                return response.status(200).json({
                    sucesso: true,
                    mensagem: 'Visita excluída com sucesso',
                    dados: null
                });

            } catch (error) {
                await db.query('ROLLBACK');
                throw error;
            }

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao excluir visita',
                dados: error.message
            });
        }
    }
};