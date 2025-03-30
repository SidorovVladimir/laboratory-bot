import 'dotenv/config';
import { Bot, webhookCallback } from 'grammy';

import { setupMenuCommand, setupStartCommand } from './commands/index.js';
import {
  setupAreaHandler,
  setupBackHandler,
  setupMessageHandler,
  setupWeatherHandler,
  setupErrorHandler,
} from './handlers/index.js';
import { getSession } from './sessions/state.js';
const token = process.env.BOT_TOKEN;
const bot = new Bot(token);

bot.use(getSession);

bot.api.setMyCommands([
  { command: 'start', description: 'Запуск бота' },
  {
    command: 'menu',
    description: 'Меню',
  },
]);

setupStartCommand(bot);
setupMenuCommand(bot);

setupAreaHandler(bot);
setupBackHandler(bot);
setupWeatherHandler(bot);

setupMessageHandler(bot);

setupErrorHandler(bot);

export default webhookCallback(bot, 'https');
