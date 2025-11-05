const db = require("../dataBase/connection");

module.exports = {
  async listarPessoas(request, response) {
    try {
      const sql =
        "SELECT ID_Pessoa, TP_Pessoa, NM_Pessoa, NO_Documento, DT_Nascimento, NO_Telefone, Email FROM pessoa;";

      const [rows] = await db.query(sql);
      return response.status(200).json({
        sucesso: true,
        mensagem: "Lista Pessoas",
        itens: rows.length,
        dados: rows,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro na requisição",
        dados: error.message,
      });
    }
  },

  async atualizarPessoas(request, response) {
    try {
      const {
        TP_Pessoa,
        NM_Pessoa,
        NO_Documento,
        DT_Nascimento,
        NO_Telefone,
        Email,
      } = request.body;
      const { ID_Pessoa } = request.params;

      const sql =
        "update pessoa set  TP_Pessoa = ?, NM_Pessoa =?, NO_Documento =?,DT_Nascimento =?,NO_Telefone =?,Email =? where ID_Pessoa = ?";

      const values = [
        TP_Pessoa,
        NM_Pessoa,
        NO_Documento,
        DT_Nascimento,
        NO_Telefone,
        Email,
        ID_Pessoa,
      ];

      const dadosAtualizados = await db.query(sql, values);

      return response.status(200).json({
        sucesso: true,
        mensagem: `Pessoa ${ID_Pessoa} atualizada com sucesso!`,
        dados: dadosAtualizados[0].affectedRows,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro na requisição",
        dados: error.message,
      });
    }
  },

  async inserirPessoas(request, response) {
    try {
      const {
        TP_Pessoa,
        NM_Pessoa,
        NO_Documento,
        DT_Nascimento,
        NO_Telefone,
        Email,
      } = request.body;

      const sql =
        "insert into pessoa (TP_Pessoa, NM_Pessoa, NO_Documento, DT_Nascimento, NO_Telefone, Email) values (?,?,?,?,?,?)";

      const values = [
        TP_Pessoa,
        NM_Pessoa,
        NO_Documento,
        DT_Nascimento,
        NO_Telefone,
        Email,
      ];

      const [results] = await db.query(sql, values);

      const pessoaId = results.insertId;

      return response.status(200).json({
        sucesso: true,
        mensagem: "Pessoa Inseridas",
        dados: pessoaId,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro na requisição",
        dados: error.message,
      });
    }
  },

  async excluirPessoas(request, response) {
    try {
      const { ID_Pessoa } = request.params;

      const sql = "delete from pessoa where ID_Pessoa = ?";

      const values = [ID_Pessoa];

      const [results] = await db.query(sql, values);

      if (results.affectedRows === 0) {
        return response.status(404).json({
          sucesso: false,
          mensagem: `Pessoa ${ID_Pessoa} não encontrado!`,
          dados: null,
        });
      }

      return response.status(200).json({
        sucesso: true,
        mensagem: `Pessoa ${ID_Pessoa} excluida com sucesso!`,
        dados: null,
      });
    } catch (error) {
      return response.status(500).json({
        sucesso: false,
        mensagem: "Erro na requisição",
        dados: error.message,
      });
    }
  },
};
