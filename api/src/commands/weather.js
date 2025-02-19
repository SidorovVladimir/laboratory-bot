export const setupWeatherCommand = (bot) => {
  bot.command('weather', async (ctx) => {
    ctx.session.weather = { step: 'ask_city' };
    await ctx.reply('Назови свой город:', {
      reply_parameters: { message_id: ctx.msg.message_id },
    });
  });
};
