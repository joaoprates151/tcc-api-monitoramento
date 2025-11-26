const mysql = require("mysql2/promise");

const BD_USUARIO = "us_infonet_224_monit_prev";
const BD_SENHA = "mnt489prev"; // senha
const BD_SERVIDOR = '10.67.22.216'; // servidor
//const BD_SERVIDOR = "localhost"; //casa
const BD_PORTA = "3306"; // porta
const BD_BANCO = "bd_tcc_infonet_224_monit_prev"; // nome do banco
let connection;

const config = {
  host: BD_SERVIDOR,
  port: BD_PORTA, //Default: 3306
  user: BD_USUARIO,
  password: BD_SENHA,
  database: BD_BANCO,
  waitForConnections: true,
  connectionLimit: 10, //Default: 10 - deixar 100 ou 1000
  queueLimit: 0,
};

/*
    -queueLimit-
    O número máximo de solicitações de conexão que o pool enfileirará
    antes de retornar um erro do getConnection. Se definido como 0, não
    há limite para o número de solicitações de conexão enfileiradas. (Padrão: 0)
*/

try {
  connection = mysql.createPool(config);

  console.log("Chamou conexão MySql!");
} catch (error) {
  console.log(error);
}

module.exports = connection;
