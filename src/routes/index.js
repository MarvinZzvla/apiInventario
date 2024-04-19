import {Router} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {readFile,writeFile} from '../controllers/controllerToken.js'
dotenv.config()

//Declare Variables
const router = Router()
const secretPassword = process.env.SECRET_PASS  //Get secret password
let usedTokens = JSON.parse(readFile); //parse json the passwords

/**************************************
 * GENERAR TOKEN
 ***************************************/
function generarToken() {
    const user = {};
    const token = jwt.sign(user,secretPassword,{expiresIn: '1h'})
    return token
}

router.post('/generate', (req, res) => {
    //const user = {}
    const token = generarToken()
    res.json({ token });
})

router.post('/consume', (req, res) => {
  
    const token = req.body.token;

    try {
        // Verificar el token
        jwt.verify(token, secretPassword);

        // Verificar si el token ya ha sido usado
        if (usedTokens.includes(token)) {
        
            return res.status(401).json({ message: 'El token ya ha sido usado' });
        }

        // Marcar el token como usado
        usedTokens.push(token);

        // Guardar los tokens usados en el archivo
        writeFile(usedTokens);

        res.status(200).json({ message: 'Token consumido exitosamente'});
    } catch (error) {
        res.status(400).json({ message: 'Token inválido  ' + error.message });
    }
})

export default router