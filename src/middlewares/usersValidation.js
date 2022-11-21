import db from "../database/db.js";
import { signInSchema, signUpSchema } from '../models/users.models.js'

export async function signUpValidation(req, res, next) {
    
    const validation = signUpSchema.validate(req.body, {abortEarly:false});
    if (validation.error) {
        const errors = validation.error.details.
            map((detail) => detail.message);
        console.log(errors);
        return res.status(400).send(errors);
    }
    
    const { name, email, password } = req.body;


    try {
        const userFound = await db.
            collection('users').findOne({ email });
        if (userFound)
            return res.status(409).send('Email já cadastrado');
    }
    catch (error) {
        console.log(error);
        res.sendStatus(422);
    }

    res.locals.user = {
        name,
        email,
        password
    }

    next();
}

export async function signInValidation(req, res, next) {

    const validation = signInSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.
            map((detail) => detail.message);
        console.log(errors);
        return res.status(400).send(errors);
    }
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    if (!user) {
        return res.status(404).send('Usuário não encontrado');
    }

    res.locals.user = {
        email,
        password
    }
    next();
}