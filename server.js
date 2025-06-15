const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');


const tarefasRoutes = require('./routes/tarefasRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const projetosRoutes = require('./routes/projetosRoutes');
const timesRoutes = require('./routes/timesRoutes');
const timesProjetosRoutes = require('./routes/timesProjetosRoutes');
const authRoutes = require('./routes/authRoutes');
const frontendRoutes = require('./routes/frontendRoutes');



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false  
  }));


app.use('/api', usuarioRoutes);
app.use('/', projetosRoutes);
app.use('/api', timesRoutes);
app.use('/api', timesProjetosRoutes);
app.use('/auth', authRoutes);
app.use('/', frontendRoutes);
app.use('/', tarefasRoutes);


app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

