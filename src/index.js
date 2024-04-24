const app = require('./app');
const sequelize = require('./basedatos/bd');
const Interprete = require('./models/Interprete');
const Disco = require('./models/Disco');
const Cancion = require('./models/Cancion');


async function main() {
  try{
    await sequelize.sync({ force: false });
    app.listen(app.get('port'));
    console.log('Servidor escuchando en el puerto', app.get('port'));
  }
  catch(error){
    console.error('No se ha podido hacer la conexión:', error);
  }
};

main();
