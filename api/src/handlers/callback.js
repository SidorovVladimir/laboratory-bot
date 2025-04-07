import {
  areaMenu,
  backKeyboard,
  calculationsMenu,
  mainMenu,
  toolsMenu,
} from '../keyboards/index.js';

export const menuCalculations = (bot) => {
  bot.callbackQuery('menu_calculations', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: calculationsMenu,
    });
    await ctx.answerCallbackQuery();
  });
};

export const menuArea = (bot) => {
  bot.callbackQuery('calc_area', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: areaMenu,
    });
    await ctx.answerCallbackQuery();
  });
};

export const setupToolsMenu = (bot) => {
  bot.callbackQuery('menu_tools', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: toolsMenu,
    });
    await ctx.answerCallbackQuery();
  });
};

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
  bot.callbackQuery('tool_weather', async (ctx) => {
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

export const backMainMenu = (bot) => {
  bot.callbackQuery('menu_main', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: mainMenu,
    });
    await ctx.answerCallbackQuery();
  });
};
