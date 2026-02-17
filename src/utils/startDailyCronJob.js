import cron from 'node-cron';
import { client } from '../db.js';

export const startDailyCronJob = (bot) => {
  cron.schedule('0 0 9 * * *', async () => {
    console.log('📅 Запуск ежедневной проверки событий...');

    try {
      const briefingLog = await client.query(
        `SELECT full_name FROM briefing_log WHERE "date" + (periodicity * INTERVAL '1 month') <= CURRENT_DATE + 5`
      );
      const fireBriefingLog = await client.query(
        `SELECT full_name FROM fire_briefing_log WHERE "date" + (periodicity * INTERVAL '1 month') <= CURRENT_DATE + 5`
      );
      const powerToolLog = await client.query(
        `SELECT name, inventory_number FROM power_tool_inspection_log WHERE "date" + (periodicity * INTERVAL '1 month') <= CURRENT_DATE + 5`
      );
      const slingLog = await client.query(
        `SELECT name, inventory_number FROM sling_inspection_log WHERE "date" + INTERVAL '10 days' <= CURRENT_DATE + 5`
      );

      const alerts = [];

      if (briefingLog.rows.length > 0) {
        const names = briefingLog.rows.map((r) => r.full_name).join('\n  • ');
        alerts.push(
          `❗ *Инструктаж по ОТ:*\n  • ${names}`
        );
      }

      if (fireBriefingLog.rows.length > 0) {
        const names = fireBriefingLog.rows.map((r) => r.full_name).join('\n  • ');
        alerts.push(`🔥 *Пожарный инструктаж:*\n  • ${names}`);
      }

      if (powerToolLog.rows.length > 0) {
        const names = powerToolLog.rows.map((r) => `${r.name} (инв. №${r.inventory_number})`).join('\n  • ');
        alerts.push(
          `🔧 *Осмотр электроинструмента:*\n  • ${names}`
        );
      }

      if (slingLog.rows.length > 0) {
        const names = slingLog.rows.map((r) => `${r.name} (инв. №${r.inventory_number})`).join('\n  • ');
        alerts.push(`🪝 *Осмотр строп:*\n  • ${names}`);
      }

      if (alerts.length === 0) {
        console.log('✅ Нет предстоящих событий.');
        return;
      }

      const messageText =`🚨 *Напоминание о проверках (< 5 дней):*\n\n${alerts.join('\n\n')}`.trim();
      const chatIds = await client.query(`SELECT user_chat_id FROM auth`);
      for (const row of chatIds.rows) {
        try {
          await bot.api.sendMessage(row.user_chat_id, messageText, {
            parse_mode: 'Markdown',
          });
        } catch (err) {
          console.error(
            `❌ Не удалось отправить сообщение пользователю ${row.user_chat_id}:`,
            err.message
          );
        }
      }
    } catch (err) {
      console.error('❌ Ошибка в ежедневном крон-задании:', err);
    }
  });
};
