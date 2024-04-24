const Cancion = require('../models/Cancion');
const Disco = require('../models/Disco');
const Interprete = require('../models/Interprete');

const verCanciones = async (req, res) => {
  try {
    
    const paginaAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    
    let size = 50;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 50) {
        size = sizeAsNumber;
      }
      
    let page = 0;
    if(!Number.isNaN(paginaAsNumber) && paginaAsNumber > 0) {
        page = paginaAsNumber;
      }
        
    const {count, rows} = await Cancion.findAndCountAll();

    let opciones = {
      include: [
        { model: Interprete },
        { model: Disco }
      ],
      order:[
      ['interpreteId', 'ASC'],
      ['discoId', 'ASC'],
      ['id', 'ASC'],
      ],
      offset: page * size,
      limit: size
    }
        
    const canciones = await Cancion.findAll(opciones);
    
    res.render('lista_canciones', {
      canciones,
      title: 'indice de canciones',
      current: page,
      paginas: Math.ceil((count/size)-1)
    });
    
  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verCancion = async (req, res) => {
  const { id } = req.params;

  try {

    let opciones = {
      where: {id},
      include: [
        { model: Interprete },
        { model: Disco }
      ]
    }

    const cancion = await Cancion.findOne(opciones);

    if(!cancion) res.render('noEncontrado');

    res.render('verCancion', {
      title: 'Toda la información de la canción',
      cancion
    });

  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verAddCancion = (req, res) => {
  try {

    res.render('addCancion', {
      title: 'Añadir canción'});

  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const crearCancion = async (req, res) => {
  const {id, titulo, cantante, duracion, enlace, interpreteId, discoId} = req.body;
 
  try {
	  const nueva_cancion = await Cancion.create({
      id, titulo, cantante, duracion, enlace, interpreteId, discoId});

    res.redirect('/canciones?page=0');

  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verEditCancion = async (req, res) => {
  const { id } = req.params;
  
  try {
    let opciones = {
      include: [
        { model: Interprete },
        { model: Disco}
      ] 
    }

    const cancion = await Cancion.findByPk(id, opciones);
   
    res.render('editCancion', {
      title: 'Editar la canción',
      cancion})
    
  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const editCancion = async (req, res) => {
  const {id} = req.params;

  try {
    const cancion = await Cancion.findOne({
      where: {id}
    });

    cancion.set(req.body);
    await cancion.save();
    
    res.redirect('/canciones?page=0');

  } catch (error) {
    return res.status(500).json({mensaje: error.mesagge});
  }
}

const eliminarCancion = async (req, res) => {
  const { id } = req.params;

  try {
    
    await Cancion.destroy({where: {id}});

    res.redirect('/canciones?page=0');

  } catch (error) {
    return res.status(500).send({mensaje: error.mesagge});
  }
}

module.exports = {
  verCanciones,
  verCancion,
  verAddCancion,
  crearCancion,
  verEditCancion,
  editCancion,
  eliminarCancion
}