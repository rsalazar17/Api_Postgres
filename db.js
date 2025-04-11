const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,        
    user: 'postgres',        
    password: 'Ronal1731',  
    database: 'postgres'
});


pool.connect((error, client, release) => {
    if (error) {
        console.error('Error conectando a la base de datos PostgreSQL', error);
        return;
    } else {
        console.log('Conectado a la base de datos PostgreSQL');
        release();
    }
});

module.exports = pool;