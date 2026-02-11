import 'dotenv/config';
import { Bot } from 'grammy';
import express from 'express';

import { setupMenuCommand, setupStartCommand } from './commands/index.js';
import {
  setupAreaHandler,
  setupMessageHandler,
  setupWeatherHandler,
  setupErrorHandler,
  menuCalculations,
  backMainMenu,
  setupToolsMenu,
  menuArea,
  menuFlowRate,
  setupRectangularHandler,
  setupCircularHandler,
  menuPPE,
  getListPPE,
  menuJornal,
  briefingLog,
  briefingFireLog,
  powerToolLog,
  slingLog,
  settingsLogs,
} from './handlers/index.js';
import { getSession } from './sessions/state.js';
import { client } from './db.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import router from './routes/index.js';

const token = process.env.BOT_TOKEN_TEST;
const bot = new Bot(token);
const app = express();
app.use(express.json());
app.use('/api', router);
bot.use(getSession);
app.set('view engine', 'pug')
app.set('views', './src/views');

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
setupToolsMenu(bot);
menuPPE(bot);
menuJornal(bot);
getListPPE(bot);
briefingLog(bot);
briefingFireLog(bot);
powerToolLog(bot);
slingLog(bot);
settingsLogs(bot);

setupAreaHandler(bot);
setupRectangularHandler(bot);
setupCircularHandler(bot);
backMainMenu(bot);
setupWeatherHandler(bot);

setupMessageHandler(bot);

setupErrorHandler(bot);

async function startServer() {
  try {
    await client.query('SELECT 1');
    console.log('✅ База данных подключена');
    
    app.listen(3000, () => console.log('🚀 Сервер на порту 3000'));

    bot.start();
    console.log('Бот запущен и слушает обновления');
    
  } catch (err) {
    console.error('❌ Ошибка при запуске:', err.stack);
    process.exit(1); 
  }
}

await startServer();
