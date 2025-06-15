INSERT INTO users (name_users, email, password) VALUES
('Maria Silva', 'maria@example.com', '123456'),
('João Pedro', 'joao@example.com', '123456');

INSERT INTO teams (name_teams) VALUES
('Time Alpha'),
('Time Beta');

INSERT INTO projects (name_projects, description_projects, color_projects) VALUES
('Projeto TCC', 'Desenvolvimento do projeto final', '#FF5733'),
('Sistema Interno', 'Sistema interno da empresa', '#33A1FF');

INSERT INTO tasks (title_tasks, description_tasks, status, priority, user_id, team_id, project_id) VALUES
('Criar banco de dados', 'Modelar tabelas principais', 'Pendente', 'Alta', 1, 1, 1),
('Design de telas', 'Criar protótipos no Figma', 'Em Andamento', 'Média', 2, 2, 2);
