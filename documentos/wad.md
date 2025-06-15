
# Web Application Document - Projeto Individual - Módulo 2 - Inteli

#### Autor do projeto
Eduarda Nunes Dias

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução 

O sistema proposto consiste em uma aplicação web para gerenciamento de tarefas, desenvolvida com o objetivo de auxiliar usuários que possuem uma rotina intensa e múltiplas responsabilidades. A plataforma permitirá a criação e organização de tarefas, projetos, equipes, etiquetas e anexos, possibilitando também a categorização das atividades por prioridade e status (como pendente, em andamento e concluída), o que contribui diretamente para uma gestão mais eficiente do tempo e das demandas. A interface será projetada para ser simples, prática e intuitiva, garantindo facilidade de uso.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

O projeto Task Manager é uma aplicação full-stack construída com Node.js, Express, EJS e PostgreSQL (hospedado via Supabase). A aplicação adota a arquitetura MVC, realiza validação de dados com Joi e testes com Jest.

**Funcionalidades principais:**
- Autenticação de usuários
- CRUD completo de tarefas, times, projetos e usuários
- Relacionamento N:N entre times e projetos
- Tarefas com prioridade e status (enums)
- Integração de etiquetas por tarefa
- Interface simples com views EJS
- Testes automatizados com Jest e Supertest

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

#### Modelo relacional
![Diagrama do Banco de Dados](../assets/modelo-relacional.png)

O modelo relacional é uma forma estruturada de organizar os dados de um banco por meio de tabelas, onde cada tabela representa uma entidade (como usuários, tarefas ou projetos), com colunas que definem os atributos e linhas que representam os registros. As tabelas se conectam por chaves primárias e estrangeiras, o que permite relacionar as informações sem repetir dados. 

#### Modelo físico
```sql
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
        CREATE TYPE task_status AS ENUM ('Pendente', 'Em andamento', 'Concluída');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_priority') THEN
        CREATE TYPE task_priority AS ENUM ('Baixa', 'Média', 'Alta');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name_users VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(225) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name_projects VARCHAR(100) NOT NULL,
  description_projects TEXT,
  color_projects TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name_teams VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team_projects (
  team_id INT NOT NULL,
  project_id INT NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (team_id, project_id),
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_team_projects_team') THEN
        CREATE INDEX idx_team_projects_team ON team_projects(team_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_team_projects_project') THEN
        CREATE INDEX idx_team_projects_project ON team_projects(project_id);
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  team_id INT NOT NULL,
  name_team_members VARCHAR(100) NOT NULL,
  role_team_members VARCHAR(100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title_tasks VARCHAR(225) NOT NULL,
  description_tasks TEXT,
  user_id INT,
  team_id INT,
  project_id INT,
  status task_status DEFAULT 'Pendente',
  priority task_priority DEFAULT 'Média',
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);
```
O modelo físico é a etapa onde tudo aquilo que foi pensado no modelo lógico vira código e estrutura real dentro do banco de dados. Nele, definimos exatamente como as tabelas vão ser criadas, os tipos de dados de cada coluna, os índices, restrições e como os dados vão ser armazenados. É onde o banco começa a existir de fato, com comandos SQL que criam as tabelas e relações.


#### 3.1.1 BD e Models

No projeto, foram implementados diversos models para gerenciar as diferentes entidades do banco de dados. Cada model é responsável pela lógica de acesso aos dados e as regras de negócio específicas de cada entidade:

- **TarefaModel**: gerenciamento de tarefas com validação, criação, edição, exclusão.
- **UsuarioModel**: controle de usuários, criação e autenticação.
- **ProjetoModel**: manipulação de projetos e suas atualizações.
- **TimeModel**: controle e gerenciamento de equipes.
- **TimeProjetoModel**: manutenção da tabela N:N entre times e projetos.

---

### 3.2 Arquitetura MVC

![Diagrama MVC](../assets/diagrama-mvc.jpg)

**Fluxo de Dados:**

1. **Cliente → Controller**
   - Requisições HTTP são recebidas por controladores (ex.: tarefaController)

2. **Controller → Model**
   - O controlador processa a requisição e chama o método apropriado no model

3. **Model → Banco de Dados**
   - O model interage com o banco de dados, realizando validações e aplicando regras de negócio

4. **Model → Controller → Cliente**
   - O resultado é retornado ao cliente como resposta (JSON ou página renderizada)

**Componentes:**

- **Model**: acesso ao PostgreSQL e regras de negócio
- **Controller**: coordena lógica entre requisição e resposta
- **Routes**: define endpoints da API
- **Views (EJS)**: páginas renderizadas no frontend
- **Database**: estrutura relacional no Supabase/PostgreSQL

---

### 3.6 WebAPI e Endpoints

#### Tarefas
- `GET /api/tarefas` – Lista todas as tarefas
- `POST /api/tarefas/criar` – Cria nova tarefa
- `PUT /api/tarefas/edit/:id` – Edita tarefa
- `DELETE /api/tarefas/delete/:id` – Deleta tarefa

#### Etiquetas
- `GET /api/label` – Lista etiquetas
- `POST /api/label/criar` – Cria etiqueta
- `PUT /api/label/edit/:id` – Edita etiqueta
- `DELETE /api/label/delete/:id` – Remove etiqueta

#### Relação Tarefas-Etiquetas
- `POST /api/tasks-labels` – Atribui etiqueta à tarefa
- `DELETE /api/tasks-labels/:task_id/:label_id` – Remove etiqueta de tarefa

#### Times
- `GET /api/times`
- `POST /api/times/criar`
- `PUT /api/times/edit/:id`
- `DELETE /api/times/delete/:id`

#### Projetos
- `GET /api/projetos`
- `POST /api/projetos/criar`
- `PUT /api/projetos/edit/:id`
- `DELETE /api/projetos/delete/:id`

#### Usuários
- `GET /api/usuarios`
- `POST /api/usuarios/criar`
- `PUT /api/usuarios/edit/:id`
- `DELETE /api/usuarios/delete/:id`

#### Relação Times-Projetos
- `POST /api/times-projetos`
- `DELETE /api/times-projetos/:time_id/:projeto_id`

---

### 3.7 Interface e Navegação

A interface do projeto foi construída com EJS, combinando HTML, CSS e lógica embutida para exibir dinamicamente os dados. As principais telas incluem:

- Tela de Login/Cadastro
- Dashboard com tarefas organizadas
- Tela de criação e edição de tarefas
- Interface para gerenciamento de times e projetos

---

## 4. Desenvolvimento da Aplicação Web

### 4.1 Demonstração do Sistema Web

Link do vídeo demonstrativo:  
📽️ [https://youtu.be/a-4KNlPDoCk](https://youtu.be/a-4KNlPDoCk)

---

### 4.2 Conclusões e Trabalhos Futuros

**Pontos fortes:**
- Estrutura modular e clara com MVC
- Integração Supabase + Express
- Validações com Joi
- Testes com Jest

**Melhorias futuras:**
- Cobertura completa de testes automatizados
- Implementar autenticação JWT
- Otimizar interface para dispositivos móveis
- Implementar CI/CD para deploy contínuo

---

## 5. Referências

- Node.js: https://nodejs.org  
- Express.js: https://expressjs.com  
- PostgreSQL: https://www.postgresql.org  
- Supabase: https://supabase.com/docs  
- Joi: https://joi.dev  
- Jest: https://jestjs.io  
- MVC Patterns: https://developer.mozilla.org/en-US/docs/Glossary/MVC  
