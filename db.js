const { Pool } = require('pg'); 
const connection = new Pool({  
    connectionString: 'postgresql://postgres:Ronal1731@db.fzwdbliiefxstuntjhsq.supabase.co:5432/postgres',
    ssl: {
        rejectUnauthorized: false
    } 
});

connection.query('SELECT NOW()', (error, result) => { 
    if (error) {
        console.error('Error de conexión:', error);
    } else {
        console.log('Conectado a Supabase:', result.rows[0]);
    }
});

module.exports = connection; 

