import 'dotenv/config';
import { Bot, GrammyError, HttpError, session, webhookCallback } from 'grammy';

import {
  setupStartCommand,
  setupAreaCommand,
  setupWeatherCommand,
} from './commands/index.js';
import { setupMessageHandler } from './handlers/index.js';

const botToken = process.env.BOT_TOKEN;

const bot = new Bot(botToken);
bot.use(session({ initial: () => ({}) }));

bot.api.setMyCommands([
  { command: 'start', description: 'Запуск бота' },
  { command: 'weather', description: 'Прогноз погоды' },
  {
    command: 'area',
    description: 'Расчитать площадь боковой поверхности цилиндра',
  },
]);

setupStartCommand(bot);
setupWeatherCommand(bot);
setupAreaCommand(bot);
setupMessageHandler(bot);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e);
  } else {
    console.error('Unknown error:', e);
  }
});

export default webhookCallback(bot, 'https');
