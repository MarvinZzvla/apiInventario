import express from 'express'
import router from './routes/index.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000
const API_KEY = process.env.API_KEY; // Reemplaza esto con tu clave API

//middleware
app.use(express.json())
app.use((req, res, next) => {
    const userApiKey = req.get('X-SECRET-KEY'); // Asume que la clave API del cliente se envía en el encabezado 'X-API-KEY'

    if (userApiKey && userApiKey === API_KEY) {
        next(); // Si la clave API es válida, permite que la solicitud continúe
    } else {
        res.status(403).send('<h1>Forbbiden 403</h1>'); // Si la clave API es inválida, devuelve un error
    }
});

app.use('/api',router)



//Deploy
app.listen(PORT,() => {
    console.log('listening on port 3000')
})
