import { InlineKeyboard } from 'grammy';

export const menuKeyboard = new InlineKeyboard()
  .text('Расчитать площадь боковой поверхности', 'area')
  .row()
  .text('Прогноз погоды', 'weather')
  .row();

export const backKeyboard = new InlineKeyboard().text('< Назад в меню', 'back');
