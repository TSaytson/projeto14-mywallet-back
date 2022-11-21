import db from '../database/db.js'
import { hashSync, compareSync } from 'bcrypt';

export async function singUp(req, res) {
    const passwordHash = hashSync(
        res.locals.user.password, 10
    );
    try {
        await db.collection('users').insertOne({
            ...res.locals.user,
            password: passwordHash
        })
        res.status(201).send('Cadastrado com sucesso');
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
}

export async function singIn(req, res) {
    try {
        const userFound = await db.
            collection('users').
            findOne({ email: res.locals.user.email })
        if (userFound &&
            compareSync(res.locals.user.password, userFound.password))
            return res.status(200).send(userFound.name);
        else return res.status(403).send('Usuário não autenticado');
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}