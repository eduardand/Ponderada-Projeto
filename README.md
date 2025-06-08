
# 📌 Gerenciador de tarefas

Este é um sistema web de gerenciamento de tarefas. O projeto faz parte de uma atividade prática da faculdade e integra frontend, backend e banco de dados em uma única aplicação.

O projeto é parte de uma atividade universitária e integra **frontend, backend e banco de dados (PostgreSQL com Supabase)**.

---

## 💡 Descrição do sistema

É um sistema web para gerenciamento de tarefas com suporte a múltiplos usuários, equipes, projetos. O objetivo é facilitar a organização de atividades, especialmente para pessoas que lidam com grandes volumes de tarefas e enfrentam dificuldades em acompanhar o andamento das entregas.

---

## 📁 Estrutura de Pastas


```plaintext
Ponderada-Projeto/
│
├── 📁 config/
│   └── database.js
│
├── 📁 controllers/
│   ├── AuthController.js
│   ├── ProjetoController.js
│   ├── TarefaController.js
│   ├── TimeController.js
│   ├── TimeProjetoController.js
│   └── UsuarioController.js
│
├── 📁 documentos/
│   ├── diagrama-mvc.jpg
│   ├── modelo-fisico-simples.png
│   └── modelo-relacional.png
│
├── 📁 models/
│   ├── projetos.js
│   ├── tarefa.js
│   ├── times.js
│   ├── timesProjetos.js
│   └── usuarios.js
│
├── 📁 routes/
│   ├── authRoutes.js
│   ├── frontendRoutes.js
│   ├── projetosRoutes.js
│   ├── tarefaRoutes.js
│   ├── timeProjetoRoutes.js
│   ├── timesRoutes.js
│   └── usuariosRoutes.js
│
├── 📁 scripts/
│   ├── init.sql
│   └── runSQLScript.js
│
├── 📁 services/
│   └── tarefaService.js
│
├── 📁 styles/
│   ├── auth.css
│   ├── forms.css
│   └── styles.css
│
├── 📁 tests/
│   └── test.http
│
├── 📁 views/
│   ├── 📁 auth/
│   │   └── cadastro.ejs
│   ├── editar-tarefa.ejs
│   ├── login.ejs
│   ├── nova-tarefa.ejs
│   ├── novo-projeto.ejs
│   ├── novo-time.ejs
│   ├── tarefas.ejs
│   └── visualizacao-tarefa.ejs
│
├── .env
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
├── readme_MVC.md
├── server.js
```

## Como executar o projeto localmente
1. Clone o repositório:
git clone https://github.com/eduardand/Ponderada-Projeto.git
cd Ponderada-Projeto

2. Instale as dependências
npm install

3.Rodar o servidor
node server.js

4. Acessar no navegador
http://localhost:3000/
