import { calculateArea } from '../utils/calculateArea.js';
import { calculateFlowRate } from '../utils/calculateFlowRate.js';
import { mainMenu } from '../keyboards/index.js';

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
      
    } catch (error) {
      console.error('Ошибка при обработке ввода:', error);
    }
  });
};
