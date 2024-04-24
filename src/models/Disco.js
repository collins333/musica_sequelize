const sequelize = require('../basedatos/bd');
const { DataTypes } = require('sequelize');
const Cancion = require('./Cancion');

const Disco = sequelize.define('discos', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING
  },
  caratula: {
    type: DataTypes.TEXT
  },
  anyo: {
    type: DataTypes.STRING
  },
  info: {
    type: DataTypes.TEXT
  }
},{
  timestamps: false
});

Disco.hasMany(Cancion, {
  foreignKey: 'discoId',
  sourceKey: 'id'
});

Cancion.belongsTo(Disco, {
  foreignKey: 'discoId',
  targetKey: 'id'
});

module.exports = Disco;