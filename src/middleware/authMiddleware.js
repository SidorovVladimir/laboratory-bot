import { client } from '../db.js';

export async function authMiddleware(ctx, next) {
  const exists = await client.query(
    `SELECT * FROM auth WHERE user_chat_id = $1`,
    [ctx.from.id]
  );
  if (exists.rows.length > 0) {
    return await next();
  }

  if (!ctx.session.auth) {
    await ctx.reply('🔐 Для начала работы с ботом необходимо ввести пароль.');
    ctx.session.auth = 'auth';
  }
}
