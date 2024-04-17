import {Router} from 'express'
import crypto from 'crypto';
import {readFile,writeFile} from '../controllers/controllerToken.js'
const router = Router()

function generarToken() {
    return crypto.randomBytes(64).toString('hex');
}

router.get('/', (req, res) => {
    readFile((data) => {
        res.status(200).send(JSON.parse(data));
    });
})

router.put('/', (req, res) => {
    const update = {token: generarToken()}
    try{
    writeFile(JSON.stringify(update))
    res.status(200).send({status:'OK',code:201});
    }catch(e){
        res.status(500).send(e.message)
    }
    
})

export default router