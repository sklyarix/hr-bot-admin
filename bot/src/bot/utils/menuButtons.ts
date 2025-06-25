import { Markup } from 'telegraf';

export function mainMenuButtons() {
  const buttons = [
    ['👨‍💻 Карьера в FABRIKA'],
    ['🧑‍🧑‍🧒‍🧒Реф. программа'],
    ['ℹ️ FAQ'],
    ['📞 Контакты'],
  ];
  return Markup.keyboard(buttons).resize();
}
