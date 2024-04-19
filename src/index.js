import express from 'express'
import router from './routes/index.js'
import dotenv from 'dotenv'
import rateLimit from "express-rate-limit";
dotenv.config()

const app = express();

const PORT = process.env.PORT || 5000
const API_KEY = process.env.API_KEY; // Reemplaza esto con tu clave API

//middleware
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10minutos
    max: 20 // limita cada IP a 20 solicitudes por windowMs
  });
app.use(express.json())
app.use(limiter);
app.use((req, res, next) => {
    const userApiKey = req.get('X-SECRET-KEY'); // Asume que la clave API del cliente se envía en el encabezado 'X-API-KEY'

    if (userApiKey && userApiKey === API_KEY) {
        next(); // Si la clave API es válida, permite que la solicitud continúe
    } else {
        res.status(403).send('<h1>Forbidden 403</h1>'); // Si la clave API es inválida, devuelve un error
    }
});

app.use('/api',router)



//Deploy
app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`);
})
