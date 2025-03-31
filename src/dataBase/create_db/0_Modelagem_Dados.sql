 /*
 Criar o banco de dados
 */
 
CREATE DATABASE DB;

ALTER DATABASE DB CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI;
--// ALTER TABLE tablename CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci;


/*
CADASTRO DE SETORES: ZONA NORTE, ZONA LESTE, ZONA SUL, ZONA OESTE
*/
DROP TABLE IF EXISTS SETOR;  
CREATE TABLE SETOR (ID_Setor             INTEGER      AUTO_INCREMENT PRIMARY KEY   
                   ,NM_Setor             VARCHAR(30)  NOT NULL);
                   

/*
CADASTRO DOS BAIRROS
*/
DROP TABLE IF EXISTS BAIRRO;
CREATE TABLE BAIRRO (ID_Bairro          INTEGER         AUTO_INCREMENT PRIMARY KEY
                    ,NM_Bairro          VARCHAR(100)    NOT NULL
                    ,ID_Setor           INT             NOT NULL
  
  ,FOREIGN KEY (ID_Setor) REFERENCES SETOR(ID_Setor));     


/*
CADASTRO DE LOCALIDADE (Cidade)
*/
DROP TABLE IF EXISTS LOCALIDADE;
CREATE TABLE LOCALIDADE (ID_Localidade    INTEGER     AUTO_INCREMENT PRIMARY KEY
                        ,NM_Localidade    VARCHAR(50) NOT NULL
                        ,UF_Localidade    CHAR(2)     NOT NULL);
                        
INSERT INTO LOCALIDADE (ID_Localidade,NM_Localidade,UF_Localidade) VALUES (1,'TUPA','SP');                        

/*
CADASTRO DE RUAS
*/
DROP TABLE IF EXISTS RUA;  
CREATE TABLE RUA (ID_Rua           INTEGER       AUTO_INCREMENT PRIMARY KEY
                 ,TP_Rua           VARCHAR(15)   NOT NULL
                 ,NM_Rua           VARCHAR(100)  NOT NULL
                 ,CEP              CHAR(8)       NOT NULL
                 ,Numeracao        VARCHAR(30)   
                 ,ID_Bairro        INTEGER       NOT NULL
                 ,ID_Localidade    INTEGER       NOT NULL
                 
  ,FOREIGN KEY (ID_Bairro)     REFERENCES BAIRRO (ID_Bairro)
  ,FOREIGN KEY (ID_Localidade) REFERENCES LOCALIDADE(ID_Localidade)); 

/*
CADASTRO DE FUNÇÃO: 
- Cargo é a posição que uma pessoa ocupa em uma organização 
- Função é o conjunto de atividades e responsabilidades associadas a essa posição. 
*/

DROP TABLE IF EXISTS FUNCAO; 
CREATE TABLE FUNCAO (ID_Funcao      INTEGER         AUTO_INCREMENT PRIMARY KEY
                    ,NM_Funcao      VARCHAR(40)     NOT NULL);

  
 /*
 CADASTRO DE PESSOAS
 */
DROP TABLE IF EXISTS PESSOA;  
CREATE TABLE PESSOA (ID_Pessoa            INTEGER         AUTO_INCREMENT PRIMARY KEY
                    ,TP_Pessoa            CHAR(1)         NOT NULL   -- // (F)isica / (J)uridica 
                    ,NM_Pessoa            VARCHAR(100)    NOT NULL
                    ,NO_Documento         VARCHAR(14)     NOT NULL
                    ,DT_Nascimento        DATE            NOT NULL 
                    ,NO_Endereco          VARCHAR(10)     NOT NULL 
                    ,Complemento          VARCHAR(50) 
                    ,Telefone             VARCHAR(15)     NOT NULL
                    ,Email                VARCHAR(100)
                    ,ID_Rua               INTEGER         NOT NULL
  
  ,FOREIGN KEY (ID_Rua) REFERENCES RUA (ID_Rua));


/*
CADASTRO DO COLABORADOR/FUNCIONARIO
*/
DROP TABLE IF EXISTS COLABORADOR; 
CREATE TABLE COLABORADOR (ID_Colaborador  INTEGER         AUTO_INCREMENT PRIMARY KEY
                         ,Matricula       VARCHAR(20)     NOT NULL
                         ,SN_Temporario   CHAR(1)         NOT NULL   -- // Contratos temporários (S/N)  
                         ,DT_Cadastro     DATETIME        DEFAULT TIMESTAMP
                         ,ID_Pessoa       INT             NOT NULL
                         ,ID_Funcao       INT             NOT NULL
                         
   ,FOREIGN KEY (ID_Pessoa) REFERENCES PESSOA (ID_Pessoa)
   ,FOREIGN KEY (ID_Funcao) REFERENCES FUNCAO (ID_Funcao));                          


/*
CADASTRO DO USUARIO
*/

DROP TABLE IF EXISTS USUARIO; 
CREATE TABLE USUARIO (ID_Usuario          INTEGER         AUTO_INCREMENT PRIMARY KEY
                     ,CD_Usuario          VARCHAR(20)     NOT NULL
                     ,Senha               VARCHAR(50)     NOT NULL
                     ,DT_Cadastro         DATE            NOT NULL
                     ,DT_Ultimo_Acesso    DATE
                     ,DT_Vegencia         DATE            NOT NULL
                     ,SN_Bloqueado        CHAR(1)         NOT NULL  
                     ,ID_Pessoa           INTEGER         NOT NULL 
                    
  ,FOREIGN KEY (ID_Pessoa) REFERENCES PESSOA(ID_Pessoa));
  


/*
 - Dengue
 - Escorpião
 - Chikungunya
 - Manejo Ambiental
 - Censitátio Canino (Leishmaniose)

 - Necessário informar o caminho do icone, para que seja possível
   demonstrar no mapa a diferenciação de ocorrências
 - Para cada tipo, somente poderá ser utilizado um cor padrão, não pode duplicar  
*/

DROP TABLE IF EXISTS TIPO_OCORRENCIA; 
CREATE TABLE TIPO_OCORRENCIA (ID_Tipo_Ocorrencia      INTEGER            AUTO_INCREMENT PRIMARY KEY
                             ,NM_Tipo_Ocorrencia      VARCHAR(100)       NOT NULL 
                             ,ID_Usuario              INTEGER             
                             ,DT_Cadastro             DATE               NOT NULL 
                             ,Icone                   VARCHAR(100)    -- // Selecionar um icone padrão, informando o caminho, será demonstrado no mapa  
                             ,Cor                     VARCHAR(100)    -- // Definir uma cor padrão que será demonstrado no mapa (tabela de cores ?)
                             
  -- ,FOREIGN KEY (ID_Usuario) REFERENCES USUARIO(ID_Usuario)
  
  );                            



/*
No caso de visita no mesmo domicilio, recuperar o(s) historico(s) anterior(es) ou mais recente


1. O monitoramente constante é ir com frequência a lugares com risco de aparecimento de escorpiões 
 - cemitérios
 - campos de futebol
 - etc 

2. Não há ficha para isso. Em conversa 2 dados devem ser obrigatórios: 
 - Data da última vista
 - me disseram que é de 1 em 1 semana (ideia: mensagem de visita após esse tempo no app)
 - Quantidade de escorpiões pegos no local.


*/
DROP TABLE IF EXISTS VISTORIA; 
CREATE TABLE VISTORIA (ID_Vistoria            INTEGER      AUTO_INCREMENT PRIMARY KEY
                      ,ID_Colaborador         INTEGER      NOT NULL   -- // Agente 
                      ,DT_Cadastro            DATE                    -- // DEFAULT TIMESTAMP
                      ,DT_Solicitacao         DATE                    -- // Data da solicitação vistoria
                      ,DT_Atendimento         Date                    -- // Data da realização da vistoria  
                      ,ID_Rua                 INTEGER      NOT NULL   -- // Endereço
                      ,NO_Imovel              VARCHAR(10)  NOT NULL
                      ,NM_Morador             VARCHAR(50)  NOT NULL
                      ,NO_Telefone            VARCHAR(15)             
                      ,DS_Ponto_Referencia    VARCHAR(15)             -- // Ponto de referencia  
                      ,DS_PSF                 Varchar(30)             -- // PSF (Pronto Socorro da Família)
                      ,NM_Agente_Comunitario  VARCHAR(20)             -- // Agente Comuntário 
                      ,ST_Imovel              CHAR(1)      NOT NULL   -- // (T)rabalhado
                                                                      -- // (F)echado
                                                                      -- // (D)esocupado
                                                                      -- // (R)ecusa da visita
                      ,SN_Vistoriada          CHAR(1)                 -- // (S)im - (N)ão
                         
                      ,SN_Acidente            CHAR(1)      NOT NULL   -- // Se ocorreu um acidente (S)im - (N)ão
                      ,SINAN                  Varchar(10)             -- // Sistema de Informação de Agravos de Notificação (https://portalsinan.saude.gov.br/)      
                      ,SN_Demanda_Expontanea  CHAR(1)      NOT NULL   -- // Se foi uma demanda expontanea (S)im - (N)ão
                      ,DS_Observacao          VARCHAR(200)            -- // Observações   
                      ,SN_Agenda_Retorno      CHAR(1)      NOT NULL   -- // Agendar retorno (S)im - (N)ão, caso seja sim o campo DT_Retorno deverá ser preenchida
                      ,DT_Retono              DATE                    -- // Data do retorno (trazer 1 semana por padrão, podendo ser alterado), será utilizado para mensagens de aviso    
 
  ,FOREIGN KEY (ID_Colaborador) REFERENCES COLABORADOR(ID_Colaborador)
  ,FOREIGN KEY (ID_Rua) REFERENCES RUA(ID_Rua) );
  
  


/*
Itens que por padrão devem ser vistoriados. Deve haver documentação sobre este processo.
*/
DROP TABLE IF EXISTS VISTORIA_ITEM; 
CREATE TABLE VISTORIA_ITEM (ID_Vistoria_Item      INTEGER      AUTO_INCREMENT PRIMARY KEY
                           ,ID_Vistoria           INTEGER      NOT NULL
                           ,ID_Tipo_Ocorrencia    INTEGER      NOT NULL   -- // Caso exista alguma ocorrência durante a visita ou alguma solicitação do morador com problemas 
                           ,QT_Amostra_Coletada   INTEGER                 -- // Qtde de insetos, larvas, etc        
                           ,DS_Ocorrencia         VARCHAR(255) NOT NULL   -- // Historico da visita, ações realizadas, informações relevantes do processo 

 ,FOREIGN KEY (ID_Vistoria) REFERENCES VISTORIA(ID_Vistoria)
 ,FOREIGN KEY (ID_Tipo_Ocorrencia) REFERENCES TIPO_OCORRENCIA(ID_Tipo_Ocorrencia) );



