app.post('/api/guardar', (req, res) => {
    const { cedula, nombre, edad, profesion } = req.body;
    const query = 'INSERT INTO persona (cedula, nombre, edad, profesion) VALUES ($1, $2, $3, $4)';

    connection.query(query, [cedula, nombre, edad, profesion], (error, results) => {
        if (error) {
            console.error('ERROR COMPLETO:', error);
            return res.status(500).json({
                status: 'error',
                message: 'No se pudo insertar la persona',
                error: error
            });
        }

        res.status(201).json({ 
            status: 'success', 
            message: 'Persona insertada correctamente',
            cedula, 
            nombre, 
            edad, 
            profesion 
        });
    });
});


app.delete('/api/eliminar/:cedula', (req, res) => {
    const { cedula } = req.params;
    const query = 'DELETE FROM persona WHERE cedula = $1';
    connection.query(query, [cedula], (error, result) => {
        if (error) {
            console.error('Error al eliminar:', error);
            return res.status(500).json({ status: 'error', message: 'No se pudo eliminar la persona' });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: 'error',
                message: `No existe el registro con cédula ${cedula}`
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Persona eliminada correctamente'
        });
    });
});

app.put('/api/actualizar/:cedula', (req, res) => {
    const { cedula } = req.params;
    const { nombre, edad, profesion } = req.body;
    const query = 'UPDATE persona SET nombre = $1, edad = $2, profesion = $3 WHERE cedula = $4';
    
    connection.query(query, [nombre, edad, profesion, cedula], (error, result) => {
        if (error) {
            console.error('Error al actualizar:', error);
            return res.status(500).json({ status: 'error', message: 'No se pudo actualizar la persona' });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: 'error',
                message: `No se encontró un registro con la cédula ${cedula}`
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Persona actualizada correctamente',
            data: { cedula, nombre, edad, profesion }
        });
    });
});
