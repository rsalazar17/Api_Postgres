const express = require('express'); 
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

const pool = new Pool({
    user: 'postgres',        
    host: 'localhost',
    database: 'postgres', 
    password: 'Ronal1731',  
    port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.get('/api/prueba', (req, res) => {
    res.status(200).json({
        message: 'LA API FUNCIONA CORRECTAMENTE',
        port: PORT,
        status: 'success'
    });
});

app.post('/api/guardar', async (req, res) => {
    const { cedula, nombre, edad, profesion } = req.body;
    const query = 'INSERT INTO persona (cedula, nombre, edad, profesion) VALUES ($1, $2, $3, $4)';

    try {
        await pool.query(query, [cedula, nombre, edad, profesion]);
        res.status(201).json({ cedula, nombre, edad, profesion });
    } catch (error) {
        res.status(500).json({
            message: 'ERROR CREANDO USUARIO',
            error: error.message
        });
    }
});

app.delete('/api/eliminar/:cedula', async (req, res) => {
    const { cedula } = req.params;
    const query = 'DELETE FROM persona WHERE cedula = $1';

    try {
        const result = await pool.query(query, [cedula]);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No existe el registro con cédula ${cedula}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Dato eliminado de la tabla',
                data: result
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el registro',
            details: error.message
        });
    }
});

app.put('/api/actualizar/:cedula', async (req, res) => {
    const { cedula } = req.params;
    const { nombre, edad, profesion } = req.body;

    const query = `
        UPDATE persona
        SET nombre = $1, edad = $2, profesion = $3
        WHERE cedula = $4
    `;

    try {
        const result = await pool.query(query, [nombre, edad, profesion, cedula]);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No se encontró un registro con la cédula ${cedula}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Registro actualizado correctamente',
                data: {
                    cedula,
                    nombre,
                    edad,
                    profesion
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el registro',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
