import cron from 'node-cron';
import { client } from '../db.js';
export const startDailyCronJob = () => {
  cron.schedule('*/10 * * * * *', async () => {
    console.log('📅 Запуск ежедневной проверки событий каждые 10 секунд...');

    const result = await client.query(
      `SELECT full_name FROM briefing_log WHERE "date" + 10 > CURRENT_DATE`
    );
    console.log(result.rows);
  });

  // console.log('✅ Ежедневная задача запланирована (в 09:00 по МСК)');
};
