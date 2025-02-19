export const setupStartCommand = (bot) => {
  bot.command('start', async (ctx) => {
    await ctx.reply(`Привет ${ctx.from.first_name}! Я - Бот 🤖`, {
      reply_parameters: { message_id: ctx.msg.message_id },
    });
  });
};
