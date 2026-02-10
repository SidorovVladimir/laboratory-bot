import 'dotenv/config';
// import { Pool } from 'pg';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';

// export const client = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   database: process.env.DB_DATABASE,
// });


export const client = new PGlite("./pgdata");


export async function initDb() {
 
  const sqlPath = path.resolve(process.cwd(), 'src/init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  try {
    await client.exec(sql); 
    console.log('База успешно инициализирована!');
  } catch (err) {
    console.error('Ошибка при выполнении init.sql:', err);
  }
}