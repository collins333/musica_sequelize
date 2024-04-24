const sequelize = require('../basedatos/bd');
const { DataTypes } = require('sequelize');

const Cancion = sequelize.define('canciones', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING
  },
  cantante: {
    type: DataTypes.STRING
  },
  duracion: {
    type: DataTypes.STRING
  },
  enlace: {
    type: DataTypes.STRING
  }
},{
  timestamps: false
});

module.exports = Cancion;