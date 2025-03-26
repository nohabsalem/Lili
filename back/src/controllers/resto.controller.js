import restoService from '../services/resto.service.js'

async function create(c) {
  try {
    //Envoi du JSON
    const data = c.req.valid('json')
     await restoService.createResto(data)
     //Promesses
    return c.json({
      message: 'creation successful.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'creation failed' }, 400)
  }
}

async function loginResto (c){
  try {
    const { email, password } = c.req.valid('json')
    const token = await authService.login(email, password)

    return c.json({ message: 'Login successful', token })
  } catch (error) {
    console.log("error:", error.message)

    return c.json({ error: error.message }, 401)
  }
}

async function getAll(c) {
  try {
    // Promesses
    const resto = await restoService.findAllResto();
    return c.json(
      {
        resto,
      },
      201
    );
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch" }, 400);
  }
}

async function updateResto(c) {
  try {
    //Envoi du JSON
    const restoId = c.req.param('restoId')
    const data = c.req.valid('json')
    const resto = await restoService.findRestoById(restoId)

    if (!resto) {
      return c.json({ error: "Données du restaurant incorrectes." }, 400)
    }

    await restoService.updateResto(restoId, data)
    //Promesses
    return c.json({
      message: 'Modifications bien prises en compte.'
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Erreur lors des modifications' }, 400)
  }
}

async function deleteResto(c) {
  try {
    //Envoi du JSON
    const restoId = c.req.param('restoId');
    const resto = await restoService.findRestoById(restoId);

    if (!resto) {
      return c.json({ error: "Cet ID n'existe pas" }, 400)
    }

    await restoService.deleteResto(restoId);

    //Promesses
    return c.json({
      message: "Suppression du resto réussie"
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Échec lors de la suppression' }, 400)

  }
} 
export { create, loginResto, getAll,updateResto,deleteResto };
