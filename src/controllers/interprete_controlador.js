const Interprete = require('../models/Interprete');
const Disco = require('../models/Disco');

const verIndice = (req, res) => {
  res.render('index', {
    title: 'Mi colección de música'
  });
}

const verInterpretes = async (req, res) => {
  try {
    
    const paginaAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
        size = sizeAsNumber;
      }
      
    let page = 0;
    if(!Number.isNaN(paginaAsNumber) && paginaAsNumber > 0) {
        page = paginaAsNumber;
      }
        
    const {count, rows} = await Interprete.findAndCountAll();
        
    let opciones = {
      order:[['nombre', 'ASC']],
      offset: page * size,
      limit: size,
    };
              
    const interpretes = await Interprete.findAll(opciones);
    
    res.render('lista_interpretes', {
      interpretes,
      title: 'indice de cantantes',
      current: page,
      paginas: Math.ceil((count/size)-1)
    });
    
  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verInterprete = async (req, res) => {
  const { id } = req.params;

  try {

    let opciones = {
      where: {id},
      include: [{
        model: Disco
      }]
    }

    const interprete = await Interprete.findOne(opciones);

    let opciones2 = {
      where: {interpreteId: id},
      order:[
        ['anyo', 'ASC'],
        ['titulo', 'ASC']
      ],
    }

    const discos = await Disco.findAll(opciones2);

    if(!interprete) res.render('noEncontrado');

    res.render('verInterprete', {
      title: 'Toda la información del cantante',
      interprete,
      discos
    });

  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verAddInterprete = (req, res) => {
  try {

    res.render('addInterprete', {
      title: 'Añadir intérprete'});

  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const crearInterprete = async (req, res) => {
  const { id, nombre, nacionalidad, info, caratula } = req.body;

  try {
    const nuevo_interprete = await Interprete.create({
      id, nombre, nacionalidad, info, caratula });

    res.redirect('/interpretes?page=0');

  } catch(error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const verEditInterprete = async (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad, info, caratula } = req.body;
  
  try {

    const interprete = await Interprete.findByPk(id);
    interprete.id = id;
    interprete.nombre = nombre;
    interprete.nacionalidad = nacionalidad;
    interprete.info = info;
    interprete.caratula = caratula;
    
    res.render('editInterprete', {
      title: 'Editar el intérprete',
      interprete})
    
  } catch (error) {
    return res.status(500).send({mensaje: error.message});
  }
}

const editInterprete = async (req, res) => {
  const {id} = req.params;

  try {
    const interprete = await Interprete.findOne({
      where: {id}
    });

    interprete.set(req.body);
    await interprete.save();
    
    res.redirect('/interpretes?page=0');

  } catch (error) {
    return res.status(500).send({mensaje: error.mesagge});
  }
}

const eliminarInterprete = async (req, res) => {
  const { id } = req.params;

  try {
    
    await Interprete.destroy({where: {id}});

    res.redirect('/interpretes?page=0');

  } catch (error) {
    return res.status(500).send({mensaje: error.mesagge});
  }
}

const buscarInterprete = async (req, res) => {
  // try {
    if(req.query.buscar){
      const interpretes = await Interprete.findAll({
        where: {
          nombre: {
            $regex:'.*'+req.query.buscar+'.*',
            $options: 'i'}
        }
      });

      if(interpretes.lenght != 0) {
        res.render('buscar', {
          title: 'buscador de intérpretes',
          interpretes
        });
      } else {
        res.render('noEncontrado', {
          title: 'Buscador de intérpretes'
        });
      }
    
    } else {
      res.render('noEncontrado', {
        title: 'Buscador de intérpretes'
      });
    }
  // } catch (error) {
  //   return res.status(500).send({mensaje: error.mesagge});
  // }
}

module.exports = {
  verIndice,
  verInterpretes,
  verInterprete,
  verAddInterprete,
  crearInterprete,
  verEditInterprete,
  editInterprete,
  eliminarInterprete,
  buscarInterprete
};