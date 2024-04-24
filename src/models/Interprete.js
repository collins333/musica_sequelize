const sequelize = require('../basedatos/bd');
const { DataTypes } = require('sequelize');
const Disco = require('./Disco');
const Cancion = require('./Cancion');

const Interprete = sequelize.define('interpretes', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING
  },
  nacionalidad: {
    type: DataTypes.STRING
  },
  info: {
    type: DataTypes.TEXT
  },
  caratula: {
    type: DataTypes.TEXT
  }
},{
  timestamps: false
});

Interprete.hasMany(Disco, {
  foreignKey: 'interpreteId',
  sourceKey: 'id'
});

Disco.belongsTo(Interprete, {
  foreignKey: 'interpreteId',
  targetKey: 'id'
});

Interprete.hasMany(Cancion, {
  foreignKey: 'interpreteId',
  sourceKey: 'id'
});

Cancion.belongsTo(Interprete, {
  foreignKey: 'interpreteId',
  targetKey: 'id'
});

module.exports = Interprete;