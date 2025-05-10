import {
  areaMenu,
  backKeyboard,
  calculationsMenu,
  mainMenu,
  toolsMenu,
  flowRateMenu,
} from '../keyboards/index.js';

// Главное меню

export const menuCalculations = (bot) => {
  bot.callbackQuery('menu_calculations', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: calculationsMenu,
    });
    await ctx.answerCallbackQuery();
  });
};

// Меню расчета площадей

export const menuArea = (bot) => {
  bot.callbackQuery('calc_area', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: areaMenu,
    });
    await ctx.answerCallbackQuery();
  });
};

// Меню расчета расхода потока

export const menuFlowRate = (bot) => {
  bot.callbackQuery('calc_flow_rate', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: flowRateMenu,
    });
    await ctx.answerCallbackQuery();
  });
};

// Меню полезных возможностей

export const setupToolsMenu = (bot) => {
  bot.callbackQuery('menu_tools', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: toolsMenu,
    });
    await ctx.answerCallbackQuery();
  });
};

// Площадь боковой поверхности цилиндра

export const setupAreaHandler = (bot) => {
  bot.callbackQuery('area', async (ctx) => {
    try {
      await ctx.editMessageText(
        'Введите данные для расчета в формате (мм): диаметр основания/высота цилиндра',
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

// Скорость потока прямоугольной системы

export const setupRectangularHandler = (bot) => {
  bot.callbackQuery('rectangular', async (ctx) => {
    try {
      await ctx.editMessageText(
        'Введите данные для расчета в формате: скорость потока (м/с)/сторона а (мм)/сторона в (мм)',
        {
          reply_markup: backKeyboard,
        }
      );
      ctx.session.menuMessageId = ctx.msg.message_id;
      ctx.session.flowRate.state = 'waiting_flowRate_rectangular';
    } catch (error) {
      console.error('Ошибка при редактировании сообщения:', error);
    } finally {
      await ctx.answerCallbackQuery();
    }
  });
};

// Скорость потока круглой системы

export const setupCircularHandler = (bot) => {
  bot.callbackQuery('circular', async (ctx) => {
    try {
      await ctx.editMessageText(
        'Введите данные для расчета в формате: скорость потока (м/с)/диаметр системы (мм)',
        {
          reply_markup: backKeyboard,
        }
      );
      ctx.session.menuMessageId = ctx.msg.message_id;
      ctx.session.flowRate.state = 'waiting_flowRate_circular';
    } catch (error) {
      console.error('Ошибка при редактировании сообщения:', error);
    } finally {
      await ctx.answerCallbackQuery();
    }
  });
};

// Прогноз погоды

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

// Назад в главное меню

export const backMainMenu = (bot) => {
  bot.callbackQuery('menu_main', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: mainMenu,
    });
    await ctx.answerCallbackQuery();
  });
};
