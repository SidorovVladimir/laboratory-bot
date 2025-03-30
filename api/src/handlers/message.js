import { calculateArea } from '../utils/calculateArea.js';
import { menuKeyboard } from '../keyboards/index.js';
import { getWeather } from '../api/weather/index.js';

export const setupMessageHandler = (bot) => {
  bot.on('message:text', async (ctx) => {
    try {
      const value = ctx.msg.text;
      if (ctx.session.area.state === 'waiting_area') {
        const area = calculateArea(value);
        await ctx.deleteMessage().catch(() => {});

        await ctx.api.editMessageText(
          ctx.chat.id,
          ctx.session.menuMessageId,
          `Площадь боковой поверхности = ${area.toFixed(3)} m2`,
          { reply_markup: menuKeyboard }
        );

        ctx.session.area.state = 'idle';
      }

      if (ctx.session.weather.state === 'waiting_weather') {
        const weatherData = await getWeather(value);
        const { temp_c, pressure_mb, humidity } = weatherData.current;
        await ctx.deleteMessage().catch(() => {});
        await ctx.api.editMessageText(
          ctx.chat.id,
          ctx.session.menuMessageId,
          `Погода в городе ${value}:\nТемпература ${temp_c}°C\nДавление ${
            pressure_mb / 10
          } кПа\nВлажность ${humidity}%`,
          { reply_markup: menuKeyboard }
        );

        ctx.session.weather.state = 'idle';
      }
    } catch (error) {
      console.error('Ошибка при обработке ввода:', error);
    }
  });
};
