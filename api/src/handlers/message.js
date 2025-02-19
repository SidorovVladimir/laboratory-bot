import { getWeather } from '../api/weather/index.js';

const keyWeather = process.env.KEY_WEATHER;
export const setupMessageHandler = (bot) => {
  bot.on('message:text', async (ctx) => {
    const text = ctx.message.text;
    if (ctx.session?.weather?.step === 'ask_city') {
      try {
        const weatherData = await getWeather(text);
        const { temp_c, pressure_mb, humidity } = weatherData.current;
        ctx.reply(
          `<b>Погода в городе ${text}:</b>\n<i>Температура ${temp_c}°C</i>\n<i>Давление ${
            pressure_mb / 10
          } кПа</i>\n<i>Влажность ${humidity}%</i>`,
          { parse_mode: 'HTML' }
        );
        ctx.session.weather = undefined;
        return;
      } catch (error) {
        ctx.reply('Не удалось получить данные о погоде. Попробуйте позже.');
        return;
      }
    }
    if (ctx.session?.area?.step === 'radius') {
      const radius = parseFloat(text);
      if (isNaN(radius)) {
        await ctx.reply('Вводить надо число :(');
        return;
      }

      ctx.session.area = { ...ctx.session.area, radius: radius };
      ctx.session.area.step = 'height';

      await ctx.reply('Введи высоту цилиндра в мм:', {
        reply_parameters: { message_id: ctx.msg.message_id },
      });
    } else if (ctx.session?.area?.step === 'height') {
      const height = parseFloat(text);

      if (isNaN(height)) {
        await ctx.reply('Вводить надо число :(');
        return;
      }
      ctx.session.area = { ...ctx.session.area, height: height };
      ctx.session.area.step = 'calculate';

      const rad = ctx.session.area.radius;
      const hei = ctx.session.area.height;
      const area = (2 * Math.PI * rad * hei) / 1000000;
      await ctx.reply(
        `Площадь боковой поверхности равно: ${area.toFixed(3)} m2`
      );
      ctx.session.area = undefined;
    } else {
      await ctx.reply('Я не знаю, что ответить :(');
    }
  });
};
