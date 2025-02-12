import 'dotenv/config';
import { Bot, GrammyError, HttpError, session } from 'grammy';

const botToken = process.env.BOT_TOKEN;

const bot = new Bot(botToken);
bot.use(session({ initial: () => ({}) }));

bot.api.setMyCommands([
  { command: 'start', description: 'Запуск бота' },
  { command: 'weather', description: 'Погода' },
  { command: 'area', description: 'Площадь боковой поверхности цилиндра' },
]);

bot.command('start', async (ctx) => {
  await ctx.reply(`Привет ${ctx.from.first_name}! Я - Бот 🤖`, {
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

bot.command('area', async (ctx) => {
  ctx.session.step = 'radius';
  await ctx.reply('Введи радиус основания в мм:', {
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

bot.command('weather', async (ctx) => {
  ctx.session.step = 'ask_city';
  await ctx.reply('Назови свой город:', {
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

bot.on('message:text', async (ctx) => {
  const text = ctx.message.text;
  if (ctx.session.step === 'radius') {
    const radius = parseFloat(text);
    if (isNaN(radius)) {
      await ctx.reply('Вводить надо число :(');
      return;
    }

    ctx.session.radius = radius;
    ctx.session.step = 'height';

    await ctx.reply('Введи высоту цилиндра в мм:', {
      reply_parameters: { message_id: ctx.msg.message_id },
    });
  } else if (ctx.session.step === 'height') {
    const height = parseFloat(text);

    if (isNaN(height)) {
      await ctx.reply('Вводить надо число :(');
      return;
    }
    ctx.session.height = height;
    ctx.session.step = 'calculate';

    const rad = ctx.session.radius;
    const hei = ctx.session.height;
    const area = (2 * Math.PI * rad * hei) / 1000000;
    await ctx.reply(`Площадь боковой поверхности равно: ${area.toFixed(3)} m2`);
    ctx.session.step = undefined;
  } else {
    await ctx.reply('Я не знаю, что ответить :(');
  }
});

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

bot.start();
