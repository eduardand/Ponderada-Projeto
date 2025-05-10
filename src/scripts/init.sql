-- DROP das tabelas (na ordem certa para não violar FK)
DROP TABLE IF EXISTS Inscricao;
DROP TABLE IF EXISTS Evento;
DROP TABLE IF EXISTS Usuario;

-- Tabela de Usuários
CREATE TABLE Usuario (
  id_usuario SERIAL PRIMARY KEY,
  nome_completo VARCHAR(100) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  data_nascimento DATE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  genero VARCHAR(20),
  cidade VARCHAR(50),
  estado VARCHAR(50)
);

-- Tabela de Eventos
CREATE TABLE Evento (
  id_evento SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  local VARCHAR(100) NOT NULL,
  vagas_totais INTEGER NOT NULL
);

-- Tabela de Inscrições
CREATE TABLE Inscricao (
  id_inscricao SERIAL PRIMARY KEY,
  id_usuario INTEGER REFERENCES Usuario(id_usuario),
  id_evento INTEGER REFERENCES Evento(id_evento),
  valor_pago DECIMAL(10,2),
  data_inscricao DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'pendente'
);

-- Inserindo usuários de exemplo
INSERT INTO Usuario (nome_completo, cpf, email, data_nascimento, senha, genero, cidade, estado)
VALUES
('Ana Maria da Silva', '12345678901', 'ana@example.com', '1990-05-10', 'senha123', 'Feminino', 'São Paulo', 'SP'),
('João Pedro Souza', '98765432100', 'joao@example.com', '1985-11-22', 'senha456', 'Masculino', 'Rio de Janeiro', 'RJ'),
('Carla Mendes', '11122233344', 'carla@example.com', '1992-08-30', 'senha789', 'Feminino', 'Belo Horizonte', 'MG');

-- Inserindo eventos de exemplo
INSERT INTO Evento (nome, data_inicio, data_fim, local, vagas_totais)
VALUES
('Conferência Tech 2025', '2025-06-15', '2025-06-17', 'Centro de Convenções SP', 100),
('Workshop de Inovação', '2025-07-10', '2025-07-11', 'Espaço Coworking RJ', 50);

-- Inserindo inscrições de exemplo
INSERT INTO Inscricao (id_usuario, id_evento, valor_pago, status)
VALUES
(1, 1, 250.00, 'confirmado'),
(2, 1, 250.00, 'pendente'),
(3, 2, 100.00, 'confirmado');
