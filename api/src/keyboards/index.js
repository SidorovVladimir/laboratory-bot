import { InlineKeyboard } from 'grammy';

export const backKeyboard = new InlineKeyboard().text(
  '🔙 Назад в главное меню',
  'menu_main'
);

export const mainMenu = new InlineKeyboard()
  .text('🧮 Расчеты', 'menu_calculations')
  .row() // Переход на новую строку
  .text('🌍 Полезные возможности', 'menu_tools');

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
  .text('💰 Конвертер валют', 'tool_currency') // Кнопка "Конвертер валют"
  .row()
  .text('🎲 Генератор случайных чисел', 'tool_random') // Кнопка "Генератор случайных чисел"
  .row()
  .text('🔙 Назад в главное меню', 'menu_main'); // Кнопка "Назад"
