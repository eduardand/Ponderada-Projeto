
# 📌 AcadEvent

**AcadEvent** é um sistema web para gerenciamento de eventos acadêmicos e inscrições, desenvolvido com o objetivo de ajudar estudantes e instituições a organizarem participantes, datas e controle de inscrições de forma prática e eficiente.

O projeto é parte de uma atividade universitária e integra **frontend, backend e banco de dados (PostgreSQL com Supabase)**.

---

## 💡 Descrição do sistema

O sistema foi desenvolvido para:

- Cadastrar usuários (estudantes)
- Cadastrar e listar eventos
- Gerenciar inscrições em eventos
- Visualizar dados em uma interface web simples
- Realizar requisições HTTP com integração ao backend

O AcadEvent é ideal para gerenciar pequenas agendas acadêmicas de eventos, como palestras, workshops ou minicursos.

---

## 📁 Estrutura de Pastas


```plaintext
meu-projeto/
│
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
│   └── modelo-banco.png   # Diagrama do modelo relacional
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env                   # Exemplo de variáveis de ambiente
├── jest.config.js         # Configuração de testes com Jest
├── package-lock.json      # Gerenciador de dependências
├── package.json           # Definições de dependências e scripts
├── readme.md              # Este documento
├── schema.sql             # Modelo físico do banco de dados (.sql)
├── server.js              # Inicialização do servidor
└── rest.http              # Arquivo opcional para testes de requisições HTTP

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

---

📌 **Licença**

Este projeto está licenciado sob a MIT License.
