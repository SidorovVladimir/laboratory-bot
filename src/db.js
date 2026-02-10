import 'dotenv/config';
import { Pool } from 'pg';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';

export const client =
  process.env.DB_MODE === 'local'
    ? new PGlite("./pgdata")
    : new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
 });


export async function initDb() {
  const sqlPath = path.resolve(process.cwd(), 'src/init.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  try {
    if (client.exec) {
      await client.exec(sql); // Для PGlite
    } else {
      await client.query(sql); // Для Pool (Postgres)
    }
    console.log('База успешно инициализирована!');
  } catch (err) {
    console.error('Ошибка при выполнении init.sql:', err);
    process.exit(1);
  }
}

if (process.argv[1] === path.resolve(process.cwd(), 'src/db.js')) {
  console.log('Запуск инициализации БД...');
  initDb().then(() => {
    console.log('Готово!');
    process.exit(0);
  }).catch((err) => {
    console.error('Критическая ошибка:', err);
    process.exit(1);
  });
}
