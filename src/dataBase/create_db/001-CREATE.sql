
CREATE TABLE `tabela` (
  `ID_Tabela` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Fisico` varchar(20) NOT NULL,
  `NM_Logico` varchar(150) NOT NULL,
  PRIMARY KEY (`ID_Tabela`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;


CREATE TABLE `parametro` (
  `ID_Parametro` int(11) NOT NULL,
  `NM_Empresa` varchar(100) NOT NULL,
  `NO_Documento` varchar(20) NOT NULL,
  `NO_RG_IE` varchar(20) NOT NULL,
  `Endereco` varchar(40) NOT NULL,
  `Bairro` varchar(30) NOT NULL,
  `Complemento` varchar(30) DEFAULT NULL,
  `CEP` char(9) NOT NULL,
  `Cidade` varchar(30) NOT NULL,
  `UF` char(2) NOT NULL,
  `E_Mail` varchar(100) DEFAULT NULL,
  `Site` varchar(100) DEFAULT NULL,
  `Telefone` varchar(15) NOT NULL,
  `DT_Implantacao` date NOT NULL,
  `Licenca` varchar(40) NOT NULL,
  `QT_Tentativa_Login` smallint(6) NOT NULL DEFAULT '0',
  `SN_Agenda_Retorno_Visita` char(1) NOT NULL,
  `QT_Dias_Agenda_Retorno` smallint(6) NOT NULL DEFAULT '7',
  PRIMARY KEY (`ID_Parametro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `funcao` (
  `ID_Funcao` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Funcao` varchar(40) NOT NULL,
  `SN_Agente_Comunitario` char(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`ID_Funcao`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;


CREATE TABLE `setor` (
  `ID_Setor` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Setor` varchar(30) NOT NULL,
  PRIMARY KEY (`ID_Setor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


CREATE TABLE `tipo_rua` (
  `ID_Tipo_Rua` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Tipo_Rua` varchar(30) NOT NULL,
  PRIMARY KEY (`ID_Tipo_Rua`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;


CREATE TABLE `localidade` (
  `ID_Localidade` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Localidade` varchar(50) NOT NULL,
  `UF_Localidade` char(2) NOT NULL,
  PRIMARY KEY (`ID_Localidade`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


CREATE TABLE `unidade_saude` (
  `ID_Unidade_Saude` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Unidade_Saude` varchar(60) NOT NULL,
  PRIMARY KEY (`ID_Unidade_Saude`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tipo_ocorrencia`;
CREATE TABLE `tipo_ocorrencia` (
  `ID_Tipo_Ocorrencia` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Tipo_Ocorrencia` varchar(50) NOT NULL,
  `DT_Cadastro` date NOT NULL,
  `Icone` varchar(100) DEFAULT NULL,
  `Cor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_Tipo_Ocorrencia`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


CREATE TABLE `bairro` (
  `ID_Bairro` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Bairro` varchar(100) NOT NULL,
  `ID_Setor` int(11) NOT NULL,
  PRIMARY KEY (`ID_Bairro`),
   INDEX `fk_bairro_setor_idx` (`ID_Setor` ASC),
  CONSTRAINT `fk_bairro_setor`
    FOREIGN KEY (`ID_Setor`)
    REFERENCES `setor` (`ID_Setor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;


CREATE TABLE `rua` (
  `ID_Rua` int(11) NOT NULL AUTO_INCREMENT,
  `NM_Rua` varchar(100) NOT NULL,
  `CEP` char(8) NOT NULL,
  `Numeracao` varchar(30) DEFAULT NULL,
  `ID_Bairro` int(11) NOT NULL,
  `ID_Localidade` int(11) NOT NULL,
  `ID_Tipo_Rua` int(11) NOT NULL,
  PRIMARY KEY (`ID_Rua`),
  INDEX `fk_rua_bairro_idx` (`ID_Bairro` ASC),
  INDEX `fk_rua_localidade_idx` (`ID_Localidade` ASC),
  INDEX `fk_rua_tipo_rua_idx` (`ID_Tipo_Rua` ASC),
  CONSTRAINT `fk_rua_bairro`
    FOREIGN KEY (`ID_Bairro`) REFERENCES `bairro` (`ID_Bairro`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rua_localidade`
    FOREIGN KEY (`ID_Localidade`) REFERENCES `localidade` (`ID_Localidade`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rua_tipo_rua`
    FOREIGN KEY (`ID_Tipo_Rua`) REFERENCES `tipo_rua` (`ID_Tipo_Rua`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=960 DEFAULT CHARSET=utf8;


CREATE TABLE `pessoa` (
  `ID_Pessoa` int(11) NOT NULL AUTO_INCREMENT,
  `TP_Pessoa` char(1) NOT NULL,
  `NM_Pessoa` varchar(100) NOT NULL,
  `NO_Documento` varchar(14) NOT NULL,
  `DT_Nascimento` date NOT NULL, 
  `NO_Telefone` varchar(15) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_Pessoa`)  
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


CREATE TABLE `usuario` (
  `ID_Usuario` int(11) NOT NULL,
  `CD_Usuario` varchar(20) NOT NULL,
  `Senha` varchar(50) NOT NULL,
  `DT_Cadastro` date NOT NULL,
  `DH_Acesso` datetime DEFAULT NULL,
  `DT_Vigencia` date NOT NULL,
  `SN_Bloqueado` char(1) NOT NULL, 
  `Matricula` varchar(20) DEFAULT NULL, 
  `SN_Temporario` char(1) NOT NULL, 
  `ID_Funcao` int(11) NOT NULL,
  PRIMARY KEY (`ID_Usuario`),
  CONSTRAINT `fk_pessoa_usuario`
    FOREIGN KEY (`ID_Usuario`) REFERENCES `pessoa` (`ID_Pessoa`)
    ON DELETE NO ACTION ON UPDATE NO ACTION, 
  INDEX `fk_usuario_funcao_idx` (`ID_Funcao` ASC),
  CONSTRAINT `fk_usuario_funcao`
    FOREIGN KEY (`ID_Funcao`) REFERENCES `funcao` (`ID_Funcao`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


CREATE TABLE `enderecos` (
  `ID_Endereco` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Pessoa` int(11) NOT NULL,
  `ID_Rua` int(11) NOT NULL, 
  `NO_Imovel` varchar(10) NOT NULL,
  `Complemento` varchar(50) NULL,
  `DS_Ponto_Referencia` varchar(150) NULL,
  `LA_Latitude` DECIMAL(10, 6) NULL,
  `LO_Longitude` DECIMAL(10, 6) NULL, 
  PRIMARY KEY (`ID_Endereco`),
  CONSTRAINT `fk_pessoa_endereco`
    FOREIGN KEY (`ID_Pessoa`) REFERENCES `pessoa` (`ID_Pessoa`)
    ON DELETE NO ACTION ON UPDATE NO ACTION, 
  CONSTRAINT `fk_rua_endereco`
    FOREIGN KEY (`ID_Rua`) REFERENCES `rua` (`ID_Rua`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


CREATE TABLE `visita` (
  `ID_Visita` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) NOT NULL,
  `DT_Cadastro` date DEFAULT NULL,
  `DT_Solicitacao` date DEFAULT NULL,
  `DT_Atendimento` date NULL,
  `ID_Unidade_Saude` int(11) NOT NULL, 
  `ID_Pessoa` INT(11) DEFAULT NULL COMMENT 'Pessoa (proprietário ou morador) que autorizou/assinou a visita',
  `ID_Endereco` int(11) NOT NULL,
  `ST_Imovel` char(1) NOT NULL,
  `ST_Situacao` ENUM('TRABALHADO', 'FECHADO', 'RECUSA') DEFAULT NULL,
  `QT_Amostra_Coletada` int(11) DEFAULT NULL,
  `SN_Acidente` char(1) NOT NULL,
  `SN_Demanda_Expontanea` char(1) NOT NULL,
  `DS_Observacao` varchar(200) DEFAULT NULL,
  `SN_Agenda_Retorno` char(1) NOT NULL,
  `DT_Retono` date DEFAULT NULL,
  `ST_Status` char(1) DEFAULT NULL,  
  `Assinatura_Base64` TEXT DEFAULT NULL COMMENT 'Imagem da assinatura (base64)',
  PRIMARY KEY (`ID_Visita`),
   INDEX `fk_visita_usuario_idx` (`ID_Usuario` ASC),
   INDEX `fk_visita_endereco_idx` (`ID_Endereco` ASC),
  INDEX `fk_visita_unidade_idx` (`ID_Unidade_Saude` ASC),
  INDEX `fk_visita_pessoa_idx` (`ID_Pessoa` ASC),
  CONSTRAINT `visita_usuario`
    FOREIGN KEY (`ID_Usuario`) REFERENCES `usuario` (`ID_Usuario`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_visita_endereco`
   FOREIGN KEY (`ID_Endereco`) REFERENCES `enderecos` (`ID_Endereco`)
   ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_visita_unidade`
    FOREIGN KEY (`ID_Unidade_Saude`) REFERENCES `unidade_saude` (`ID_Unidade_Saude`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_visita_pessoa`
   FOREIGN KEY (`ID_Pessoa`) REFERENCES `pessoa` (`ID_Pessoa`)
   ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


CREATE TABLE `visita_item` (
  `ID_Visita_Item` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Visita` int(11) NOT NULL,
  `ID_Tipo_Ocorrencia` int(11) NOT NULL,
  `SINAN` varchar(10) DEFAULT NULL,
  `DS_Ocorrencia` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_Visita_Item`),
  INDEX `fk_item_visita_idx` (`ID_Visita` ASC),
  INDEX `fk_item_ocorrencia_idx` (`ID_Tipo_Ocorrencia` ASC),
  CONSTRAINT `fk_item_visita`
    FOREIGN KEY (`ID_Visita`) REFERENCES `visita` (`ID_Visita`)
    ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_item_ocorrencia`
    FOREIGN KEY (`ID_Tipo_Ocorrencia`) REFERENCES `tipo_ocorrencia` (`ID_Tipo_Ocorrencia`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;