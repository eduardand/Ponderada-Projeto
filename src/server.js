require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const PORT = 3000;

// Configuração do Swagger com swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Eventos',
      version: '1.0.0',
      description: 'Documentação da API da Plataforma de Eventos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Aqui você define onde estão as rotas com a documentação
};

// Gera a documentação Swagger
const swaggerSpec = swaggerJSDoc(options);

// Middleware para processar JSON
app.use(express.json());

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
const routes = require('./routes/frontRoutes');
app.use('/', routes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use(express.json());

    const userRoutes = require('./routes/userRoutes');
    app.use('/users', userRoutes);

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
