const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const publicDir = express.static(`${__dirname}/public`);

const app = express();

const InterpretesRutas = require('./routes/interprete_rutas');
const DiscosRutas = require('./routes/disco_rutas');
const CancionRutas = require('./routes/cancion_rutas');

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(publicDir);

app.use(InterpretesRutas);
app.use(DiscosRutas);
app.use(CancionRutas);

module.exports = app;