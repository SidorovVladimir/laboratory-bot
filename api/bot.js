import 'dotenv/config';
import { Bot, webhookCallback  } from 'grammy';

import { setupMenuCommand, setupStartCommand } from '../commands/index.js';
import {
  setupAreaHandler,
  setupMessageHandler,
  setupWeatherHandler,
  setupErrorHandler,
  menuCalculations,
  backMainMenu,
  menuArea,
  menuFlowRate,
  setupRectangularHandler,
  setupCircularHandler,
} from '../handlers/index.js';
import { getSession } from '../sessions/state.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");
const bot = new Bot(token);

bot.use(getSession);

//  Обработчик ввода пароля
// Если сессия ожидает пароль (auth === 'auth'), проверяем введённый текст
bot.use(async (ctx, next) => {
  if (ctx.session.auth === 'auth' && ctx.has('message:text')) {
    const value = ctx.message.text;
    if (value === process.env.SECRET) {
      await client.query(
        `INSERT INTO auth (user_chat_id, first_name) VALUES ($1, $2)`,
        [ctx.from.id, ctx.from.first_name]
      );
      ctx.session.auth = null;
      await ctx.reply('✅ Пароль верный! Добро пожаловать.');
    } else {
      await ctx.reply('❌ Неверный пароль. Попробуйте ещё раз.');
    }
    return;
  }

  await next();
});

bot.use(authMiddleware);

bot.api.setMyCommands([
  { command: 'start', description: 'Запуск бота' },
  {
    command: 'menu',
    description: 'Меню',
  },
]);
menuCalculations(bot);
menuArea(bot);
menuFlowRate(bot);
setupStartCommand(bot);
setupMenuCommand(bot);
setupAreaHandler(bot);
setupRectangularHandler(bot);
setupCircularHandler(bot);
backMainMenu(bot);
setupMessageHandler(bot);
setupErrorHandler(bot);

export default webhookCallback(bot, "https");