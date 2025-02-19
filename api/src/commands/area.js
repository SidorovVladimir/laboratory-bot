export const setupAreaCommand = (bot) => {
  bot.command('area', async (ctx) => {
    ctx.session.area = { step: 'radius' };
    await ctx.reply('Введи радиус основания в мм:', {
      reply_parameters: { message_id: ctx.msg.message_id },
    });
  });
};
