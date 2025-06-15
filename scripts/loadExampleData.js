require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');

const sqlFile = path.resolve(__dirname, 'exampleData.sql');

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE
} = process.env;

const isWindows = process.platform === 'win32';

const comando = isWindows
  ? `set PGPASSWORD=${DB_PASSWORD} && psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_DATABASE} -f "${sqlFile}"`
  : `PGPASSWORD=${DB_PASSWORD} psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -d ${DB_DATABASE} -f "${sqlFile}"`;

exec(comando, (error, stdout, stderr) => {
  if (error) {
    console.error('Erro ao carregar dados de exemplo:', error.message);
    return;
  }
  if (stderr) {
    console.error('Saída de erro:', stderr);
  }
  console.log('Dados de exemplo carregados com sucesso!');
  console.log(stdout);
});
