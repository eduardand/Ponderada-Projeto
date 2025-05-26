
# 📌 Gerenciador de tarefas

Este é um sistema web de gerenciamento de tarefas. O projeto faz parte de uma atividade prática da faculdade e integra frontend, backend e banco de dados em uma única aplicação.

O projeto é parte de uma atividade universitária e integra **frontend, backend e banco de dados (PostgreSQL com Supabase)**.

---

## 💡 Descrição do sistema

O sistema foi desenvolvido para:

- Cadastro e organização de tarefas por categoria
- Acompanhamento de status (pendente, em andamento, concluída)
- Priorização e visualização por data

---

## 📁 Estrutura de Pastas


```plaintext
meu-projeto/
│
├── config/                   # Arquivos de configuração
│   └── db.js                 # Conexão com o banco de dados PostgreSQL
│
├── controllers/              # Controladores da aplicação (MVC - C)
│   ├── userController.js     # Controlador de usuários
│   └── tarefaController.js   # Controlador de tarefas
│
├── models/                   # Modelos de dados (MVC - M)
│   ├── Usuario.js            # Modelo do usuário
│   └── Tarefa.js             # Modelo da tarefa
│
├── routes/                   # Arquivos de rotas da aplicação
│   ├── userRoutes.js         # Rotas para usuários
│   └── tarefaRoutes.js       # Rotas para tarefas
│
├── services/                 # Serviços auxiliares (regra de negócio opcional)
│   └── userService.js        # Lógica de negócio separada (se aplicável)
│
├── assets/                   # Arquivos públicos (ex: diagramas e imagens)
│   ├── modelo-banco.png      # Diagrama do banco de dados relacional
│   └── mvc-diagrama.png      # Diagrama da arquitetura MVC
│
├── scripts/                  # Scripts JavaScript públicos (opcional)
├── styles/                   # Estilos CSS (opcional)
│
├── tests/                    # Testes unitários e de integração
│   └── user.test.js          # Exemplo de teste para usuários
│
├── .gitignore                # Ignora arquivos/desnecessários para o Git
├── .env                      # Variáveis de ambiente (ex: string de conexão)
├── jest.config.js            # Configuração para o Jest (opcional)
├── package.json              # Metadados do projeto e dependências
├── package-lock.json         # Trava de versões das dependências
├── server.js                 # Ponto de entrada principal do servidor
├── schema.sql                # Script de criação do banco de dados (modelo físico)
├── init.sql                  # Script de inicialização com inserts (dados exemplo)
├── rest.http                 # Testes manuais de endpoints HTTP (VSCode REST Client)
├── README.md                 # Apresentação geral do projeto
└── README_MVC.md             # Documentação detalhada da arquitetura MVC

```

## ▶️ Como executar o projeto localmente

### 1. Clone o repositório

```bash

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

```
▶️ Como executar o projeto localmente

1. Clone o repositório

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. Instale as dependências

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente

    Crie um arquivo `.env` baseado em `.env.example` e preencha com suas credenciais:

    ```ini
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME= acadevent
    ```

4. Importe o banco de dados

    No seu SGBD (como MySQL ou MariaDB), execute o conteúdo do arquivo `schema.sql` localizado na raiz do projeto.

5. Inicie o servidor

    ```bash
    npm start
    ```

    A aplicação estará disponível em:  
    👉 [http://localhost:3001](http://localhost:3001)

---

🛠 **Tecnologias utilizadas**

- Node.js
- Express
- MySQL
- HTML, CSS, JavaScript
- Git e GitHub

## 🛠 Configurando o Banco de Dados (PostgreSQL)

1. Crie um banco de dados chamado `acadevent` no seu PostgreSQL.

2. Certifique-se de que o PostgreSQL está instalado corretamente e acessível. Você pode usar um serviço local ou na nuvem, como Supabase ou Railway.

3. Configure o arquivo `.env` com as informações de acesso ao banco:

    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=acadevent
    ```

4. Execute o arquivo `schema.sql` para criar as tabelas do sistema. Você pode fazer isso usando o terminal:

    ```bash
    psql -U seu_usuario -d acadevent -f schema.sql
    ```

5. As tabelas `usuario` e `tarefas` devem ser criadas corretamente.

---

## 📦 Rodando Migrações (caso tenha script)

Se você tiver um script de migração (`scripts/migrate.js`), rode:

```bash
npm run migrate
```

> 💡 Se você não estiver usando script JS, apenas importar o `schema.sql` já é suficiente.

---

## 📬 Testando as APIs

Você pode testar as rotas da API utilizando o **Postman**, **Insomnia** ou o plugin REST Client do **VSCode** (`rest.http`).

### 🔹 Endpoints disponíveis:

| Método | Rota                   | Descrição                   |
|--------|------------------------|-----------------------------|
| GET    | `/api/users`           | Listar todos os usuários    |
| GET    | `/api/users/:id`       | Buscar usuário por ID       |
| POST   | `/api/users`           | Criar novo usuário          |
| PUT    | `/api/users/:id`       | Atualizar dados do usuário  |
| DELETE | `/api/users/:id`       | Deletar usuário             |
| GET    | `/api/tarefas`         | Listar todas as tarefas     |
| POST   | `/api/tarefas`         | Criar nova tarefa           |
| PUT    | `/api/tarefas/:id`     | Atualizar uma tarefa        |
| DELETE | `/api/tarefas/:id`     | Deletar uma tarefa          |

---

### 🧪 Testando com `rest.http` (VSCode)

Se estiver usando VSCode com o plugin REST Client, crie ou edite um arquivo `rest.http` com exemplos como estes:

```http
### Listar usuários
GET http://localhost:3001/api/users

### Criar novo usuário
POST http://localhost:3001/api/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com"
}

### Listar tarefas
GET http://localhost:3001/api/tarefas

### Criar nova tarefa
POST http://localhost:3001/api/tarefas
Content-Type: application/json

{
  "nome": "Estudar para prova",
  "descricao": "Capítulo 5 a 8 de Álgebra Linear"
}
```
