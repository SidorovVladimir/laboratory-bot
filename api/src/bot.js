import 'dotenv/config';
import { Bot } from 'grammy';

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
} from './handlers/index.js';
import { getSession } from './sessions/state.js';

const token = process.env.BOT_TOKEN_TEST;
const bot = new Bot(token);

bot.use(getSession);

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

setupAreaHandler(bot);
setupRectangularHandler(bot);
setupCircularHandler(bot);
backMainMenu(bot);
setupWeatherHandler(bot);

setupMessageHandler(bot);

setupErrorHandler(bot);

bot.start();
