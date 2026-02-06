// Para usar variables de entorno, no necesitamos importar 'dotenv'. Next.js lo hace automáticamente.
import mysql from 'mysql2/promise';

// Creamos un "pool" de conexiones. Esto es más eficiente que crear una conexión nueva cada vez.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
