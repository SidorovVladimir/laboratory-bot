import 'dotenv/config';
import { Bot } from 'grammy';

import { setupMenuCommand, setupStartCommand } from './commands/index.js';
import {
  setupAreaHandler,
  setupBackHandler,
  setupMessageHandler,
  setupWeatherHandler,
  setupErrorHandler,
} from './handlers/index.js';
import { getSession } from './sessions/state.js';

const bot = new Bot('7658900052:AAHcNwRbLpRj3rLIS0sGz8WQfxVXQQbDmqA');

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

bot.start();
