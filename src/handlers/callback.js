import { client } from '../db.js';
import { InputFile } from 'grammy';
import {
  areaMenu,
  backKeyboard,
  calculationsMenu,
  mainMenu,
  toolsMenu,
  flowRateMenu,
  ppeMenu,
  journalMenu,
} from '../keyboards/index.js';
import { createPdfBuffer } from '../utils/generatePdf.js';

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

// Меню средств индивидуальной защиты

export const menuPPE = (bot) => {
  bot.callbackQuery('menu_ppe', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: ppeMenu,
    });
    await ctx.answerCallbackQuery();
  });
};


// Меню журналов по ОТ

export const menuJornal = (bot) => {
  bot.callbackQuery('menu_journal', async (ctx) => {
    await ctx.editMessageText('Выберите пункт меню', {
      reply_markup: journalMenu,
    });
    await ctx.answerCallbackQuery();
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

//  Получение списка СИЗ
const getList = `
SELECT s.full_name as name, ptyp.name as type, pt.name as templates, pos.number_months as month, ppe.end_date as date FROM users s
JOIN personal_protective_equipments ppe ON s.id = ppe.user_id
JOIN ppe_templates pt ON ppe.template_id = pt.id
JOIN ppe_types ptyp ON ptyp.id = pt.type_id
JOIN ppe_operating_standarts pos ON pos.id = pt.ppe_operating_id
`;

export const getListPPE = (bot) => {
  bot.callbackQuery('ppe_list', async (ctx) => {
    try {
      const result = await client.query(getList);
      const data = result.rows;
      if (data.length === 0) {
        return ctx.reply('Нет данных для отчёта.');
      }

      await ctx.reply('📄 Генерирую PDF-отчёт...');

      const pdfBuffer = await createPdfBuffer(data);

      await ctx.replyWithDocument(
        new InputFile(pdfBuffer, 'Отчет по СИЗ.pdf'),
        {
          caption: '✅ Готово! Вот ваш отчёт в формате PDF.',
        }
      );

      await ctx.answerCallbackQuery();
    } catch (err) {
      console.error('Ошибка генерации PDF:', err);
      await ctx.reply('❌ Произошла ошибка при создании отчёта.');
    }
  });
};


export const settingsLogs = (bot) => {
  bot.callbackQuery('logs_settings_menu', async (ctx) => {
    await ctx.answerCallbackQuery();
  });
};



