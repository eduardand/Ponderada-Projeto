# Nome do Projeto: Gerenciador de Usuários e Tarefas

## Descrição:
Este projeto é uma API desenvolvida em Node.js com arquitetura MVC (Model-View-Controller), que permite o gerenciamento de usuários e tarefas. Ele oferece operações de CRUD (criar, ler, atualizar e deletar) para usuários e tarefas, utilizando PostgreSQL como banco de dados.

## Arquitetura: MVC (Model-View-Controller)

## Ferramenta de Diagramação:
Draw.io

---

## Modelos (Models):

### 1. Usuário (`models/Usuario.js`)
- **Tabela:** `usuario`
- **Atributos:**
  - `id_usuario`: `SERIAL` (chave primária)
  - `nome_completo`: `VARCHAR`
  - `cpf`: `VARCHAR`
  - `email`: `VARCHAR`
  - `data_nascimento`: `DATE`
  - `senha`: `VARCHAR`
  - `genero`: `VARCHAR`
  - `cidade`: `VARCHAR`
  - `estado`: `VARCHAR`

### 2. Tarefa (`models/Tarefa.js`)
- **Tabela:** `tarefas`
- **Atributos:**
  - `id`: `SERIAL` (chave primária)
  - `nome`: `TEXT`
  - `descricao`: `TEXT`
  - `status`: `TEXT` (default: `'pendente'`)
  - `created_at`: `TIMESTAMP`
  - `updated_at`: `TIMESTAMP`

---

## Controladores (Controllers):

### 1. `UserController`
- **Responsável por:** Manipular as rotas e requisições relacionadas a usuários.
- **Ações:**
  - `getAllUsers(req, res)`: Lista todos os usuários.
  - `getUserById(req, res)`: Busca um usuário por ID.
  - `createUser(req, res)`: Cria um novo usuário.
  - `updateUser(req, res)`: Atualiza um usuário existente.
  - `deleteUser(req, res)`: Remove um usuário.

### 2. `TarefaController`
- **Responsável por:** Manipular as rotas e requisições relacionadas a tarefas.
- **Ações:**
  - `listarTarefas(req, res)`: Lista todas as tarefas.
  - `buscarTarefaPorId(req, res)`: (opcional) Busca uma tarefa por ID.
  - `criarTarefa(req, res)`: Cria uma nova tarefa.
  - `editarTarefa(req, res)`: Atualiza uma tarefa.
  - `excluirTarefa(req, res)`: Remove uma tarefa.

- **Interação com Models:** Os controladores chamam os métodos dos Models (ou dos Services, se utilizados) para realizar as operações de banco de dados.

---

## Views (Views):

Este projeto não possui views no sentido tradicional de renderização
