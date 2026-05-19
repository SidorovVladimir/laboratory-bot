import 'dotenv/config';
import { Bot, webhookCallback  } from 'grammy';

import { setupMenuCommand, setupStartCommand } from '../src/commands/index.js';
import {
  setupAreaHandler,
  setupMessageHandler,
  setupErrorHandler,
  menuCalculations,
  backMainMenu,
  menuArea,
  menuFlowRate,
  setupRectangularHandler,
  setupCircularHandler,
} from '../src/handlers/index.js';
import { getSession } from '../src/sessions/state.js';


const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is unset");
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
setupAreaHandler(bot);
setupRectangularHandler(bot);
setupCircularHandler(bot);
backMainMenu(bot);
setupMessageHandler(bot);
setupErrorHandler(bot);

export default webhookCallback(bot, "https");