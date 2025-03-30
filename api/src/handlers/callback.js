import { backKeyboard, menuKeyboard } from '../keyboards/index.js';

export const setupAreaHandler = (bot) => {
  bot.callbackQuery('area', async (ctx) => {
    try {
      await ctx.editMessageText(
        'Введите данные для расчета в формате (мм): радиус основания/высота цилиндра',
        {
          reply_markup: backKeyboard,
        }
      );
      ctx.session.menuMessageId = ctx.msg.message_id;
      ctx.session.area.state = 'waiting_area';
    } catch (error) {
      console.error('Ошибка при редактировании сообщения:', error);
    } finally {
      await ctx.answerCallbackQuery();
    }
  });
};

export const setupWeatherHandler = (bot) => {
  bot.callbackQuery('weather', async (ctx) => {
    try {
      await ctx.editMessageText('Введите город', {
        reply_markup: backKeyboard,
      });
      ctx.session.menuMessageId = ctx.msg.message_id;
      ctx.session.weather.state = 'waiting_weather';
    } catch (error) {
      console.error('Ошибка при редактировании сообщения:', error);
    } finally {
      await ctx.answerCallbackQuery();
    }
  });
};

export const setupBackHandler = (bot) => {
  bot.callbackQuery('back', async (ctx) => {
    try {
      await ctx.editMessageText('Выберите пункт меню', {
        reply_markup: menuKeyboard,
      });
      ctx.session.area.state = 'idle';
    } catch (error) {
      console.error('Ошибка при возврате в меню:', error);
    }
    await ctx.answerCallbackQuery();
  });
};
