import { menuKeyboard } from '../keyboards/index.js';

export const setupMenuCommand = (bot) => {
  bot.command('menu', async (ctx) => {
    await ctx.reply('Выберите пункт меню', {
      reply_markup: menuKeyboard,
    });
  });
};
