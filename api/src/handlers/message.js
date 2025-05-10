import { calculateArea } from '../utils/calculateArea.js';
import { calculateFlowRate } from '../utils/calculateFlowRate.js';
import { mainMenu } from '../keyboards/index.js';
import { getWeather } from '../api/weather/index.js';

export const setupMessageHandler = (bot) => {
  bot.on('message:text', async (ctx) => {
    try {
      const value = ctx.msg.text;

      // Обработка ответа пользователя для расчета площади боковой поверхности цилиндра
      if (ctx.session.area.state === 'waiting_area') {
        const area = calculateArea(value);
        await ctx.deleteMessage().catch(() => {});

        await ctx.api.editMessageText(
          ctx.chat.id,
          ctx.session.menuMessageId,
          `Площадь боковой поверхности = ${area.toFixed(3)} м²`,
          { reply_markup: mainMenu }
        );

        ctx.session.area.state = 'idle';
      }

      // Обработка ответа пользователя для расчета расхода потока прямоугольной системы

      if (ctx.session.flowRate.state === 'waiting_flowRate_rectangular') {
        const flowRate = calculateFlowRate(value, ctx);
        await ctx.deleteMessage().catch(() => {});

        await ctx.api.editMessageText(
          ctx.chat.id,
          ctx.session.menuMessageId,
          `Расход потока = ${flowRate.toFixed(3)} м3/ч`,
          { reply_markup: mainMenu }
        );

        ctx.session.flowRate.state = 'idle';
      }

      // Обработка ответа пользователя для расчета расхода потока круглой системы

      if (ctx.session.flowRate.state === 'waiting_flowRate_circular') {
        const flowRate = calculateFlowRate(value, ctx);
        await ctx.deleteMessage().catch(() => {});

        await ctx.api.editMessageText(
          ctx.chat.id,
          ctx.session.menuMessageId,
          `Расход потока = ${flowRate.toFixed(3)} м3/ч`,
          { reply_markup: mainMenu }
        );

        ctx.session.flowRate.state = 'idle';
      }

      // Обработка отвента пользователя для получения прогноза погоды по городу
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
          { reply_markup: mainMenu }
        );

        ctx.session.weather.state = 'idle';
      }
    } catch (error) {
      console.error('Ошибка при обработке ввода:', error);
    }
  });
};
