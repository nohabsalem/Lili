import assoService from "../services/asso.service.js";

async function create(c) {
    try {
        //Envoi du JSON
        const data = c.req.valid("json");
        await assoService.createAsso(data);
        //Promesses
        return c.json(
            {
                message: "creation successful.",
            },
            201
        );
    } catch (error) {
        console.error(error);
        return c.json({ error: "creation failed" }, 400);
    }
}
async function loginAsso(c) {
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
        const asso = await assoService.findAllAsso();
        return c.json(
            {
                asso,
            },
            201
        );
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to fetch" }, 400);
    }
}

async function updateAsso(c) {
    try {
        //Envoi du JSON
        const assoId = c.req.param('assoId')
        const data = c.req.valid('json')
        const asso = await assoService.findAssoById(assoId)

        if (!asso) {
            return c.json({ error: "Données de l'assso incorrectes." }, 400)
        }

        await assoService.updateAsso(assoId, data)
        //Promesses
        return c.json({
            message: 'Modifications bien prises en compte.'
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: 'Erreur lors des modifications' }, 400)
    }
}

async function deleteAsso(c) {
    try {
        //Envoi du JSON
        const assoId = c.req.param("assoId");
        const asso = await assoService.findAssoById(assoId);

        if (!asso) {
            return c.json({ error: "Cet ID n'existe pas" }, 400);
        }

        await assoService.deleteAsso(assoId);
        //Promesses
        return c.json(
            {
                message: "Suppression de l'asso réussie",
            },
            200
        );
    } catch (error) {
        console.error(error);
        return c.json({ error: "Échec lors de la suppression" }, 400);
    }
}
export { create, getAll, updateAsso, deleteAsso, loginAsso }
