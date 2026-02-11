import { InlineKeyboard } from 'grammy';

export const backKeyboard = new InlineKeyboard().text(
  '🔙 Назад в главное меню',
  'menu_main'
);

export const mainMenu = new InlineKeyboard()
  .text('🧮 Расчеты', 'menu_calculations')
  .row()
  .text('🌍 Полезные возможности', 'menu_tools')
  .row()
  .text('СИЗ', 'menu_ppe')
  .row()
  .text('Журналы по ОТ', 'menu_journal');

export const ppeMenu = new InlineKeyboard()
  .text('Список СИЗ', 'ppe_list')
  .row()
  .text('Настройки', 'settings_menu')
  .row()
  .text('🔙 Назад в главное меню', 'menu_main');

export const journalMenu = new InlineKeyboard()
  .webApp('Tестирование',  `${process.env.APP_URL}api/journals/briefing-log`)
  .row()
  .text('Инструктажей по ОТ', 'briefing_log')
  .row()
  .text('Противопожарных инструктажей', 'fire_briefing_log')
  .row()
  .text('Учета электроинструмента', 'power_tool_log')
  .row()
  .text('Учета строп', 'sling_log')
  .row()
  .text('Настройки', 'logs_settings_menu')
  .row()
  .text('🔙 Назад в главное меню', 'menu_main');


export const calculationsMenu = new InlineKeyboard()
  .text('⚡ Скорость потока', 'calc_flow_speed')
  .row()
  .text('💧 Расход потока', 'calc_flow_rate')
  .row()
  .text('📐 Площадь', 'calc_area')
  .row()
  .text('🔙 Назад в главное меню', 'menu_main');

export const flowRateMenu = new InlineKeyboard()
  .text('Прямоугольная система', 'rectangular')
  .row()
  .text('Круглая система', 'circular')
  .row()
  .text('🔙 Назад в главное меню', 'menu_main');

export const areaMenu = new InlineKeyboard()
  .text('📐 Площадь боковой поверхности цилиндра', 'area')
  .row()
  .text('🔙 Назад в главное меню', 'menu_main');

export const toolsMenu = new InlineKeyboard()
  .text('☀️ Прогноз погоды', 'tool_weather') // Кнопка "Прогноз погоды"
  .row()
  .text('🔙 Назад в главное меню', 'menu_main'); // Кнопка "Назад"
