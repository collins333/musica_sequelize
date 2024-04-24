const Disco = require('../models/Disco');
const Interprete = require('../models/Interprete');
const Cancion = require('../models/Cancion');

const verDiscos = async (req, res) => {
  try {
    
    const paginaAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    
    let size = 15;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 15) {
        size = sizeAsNumber;
      }
      
    let page = 0;
    if(!Number.isNaN(paginaAsNumber) && paginaAsNumber > 0) {
        page = paginaAsNumber;
      }
        
    const {count, rows} = await Disco.findAndCountAll();

    let opciones = {
      include: [{
        model: Interprete
      }],
      order:[
      ['interpreteId', 'ASC'],
      ['anyo', 'ASC'],
      ['titulo', 'ASC'],
      ],
      offset: page * size,
      limit: size
    }
        
    const discos = await Disco.findAll(opciones);
    
    res.render('lista_discos', {
      discos,
      title: 'indice de discos',
      current: page,
      paginas: Math.ceil((count/size)-1)
    });
    
  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verDisco = async (req, res) => {
  const { id } = req.params;

  try {

    let opciones = {
      where: {id},
      include: [
        { model: Interprete },
        { model: Cancion }
      ]
    }

    const disco = await Disco.findOne(opciones);

    let opciones2 = {
      where: {discoId: id},
      order:[
        ['id', 'ASC'],
      ]
    }

    const canciones = await Cancion.findAll(opciones2);

    if(!disco) res.render('noEncontrado');

    res.render('verDisco', {
      title: 'Toda la información del disco',
      disco,
      canciones
    });

  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verAddDisco = (req, res) => {
  try {

    res.render('addDisco', {
      title: 'Añadir disco'});

  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const crearDisco = async (req, res) => {
  const {id, titulo, caratula, anyo, info, interpreteId} = req.body;
 
  try {
	  const nuevo_disco = await Disco.create({
      id, titulo, caratula, anyo, info, interpreteId});

    res.redirect('/discos?page=0');

  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verEditDisco = async (req, res) => {
  const { id } = req.params;
  
  try {
    let opciones = {
      include: [{
        model: Interprete
      }] 
    }

    const disco = await Disco.findByPk(id, opciones);
   
    res.render('editDisco', {
      title: 'Editar el disco',
      disco})
    
  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const editDisco = async (req, res) => {
  const {id} = req.params;

  try {
    const disco = await Disco.findOne({
      where: {id}
    });

    disco.set(req.body);
    await disco.save();
    
    res.redirect('/discos?page=0');

  } catch (error) {
    return res.status(500).json({mensaje: error.mesagge});
  }
}

const eliminarDisco = async (req, res) => {
  const { id } = req.params;

  try {
    
    await Disco.destroy({where: {id}});

    res.redirect('/discos?page=0');

  } catch (error) {
    return res.status(500).send({mensaje: error.mesagge});
  }
}

module.exports = {
  verDiscos,
  verDisco,
  verAddDisco,
  crearDisco,
  verEditDisco,
  editDisco,
  eliminarDisco
}