import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { IContext } from '../../interfaces/context.interface';

@Injectable()
export class FaqUiService {
  constructor() {}

  async listFAQ(ctx: IContext) {
    await ctx.reply(
      'Выберите один из вопросов:',
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            '❔️ На какие бенефиты я могу рассчитывать?',
            'question-1',
          ),
        ],
        [
          Markup.button.callback(
            '❔️ Какие условия работы вы предлагаете?',
            'question-2',
          ),
        ],
        [
          Markup.button.callback(
            '❔️ Почему не указана вилка ЗП?',
            'question-3',
          ),
        ],
        [
          Markup.button.callback(
            '❔️ Почему мне непроходит ответ?',
            'question-4',
          ),
        ],
        [
          Markup.button.callback(
            '❔️ Обязателен ли опыт в iGaming?',
            'question-5',
          ),
        ],
        [Markup.button.callback('❔️ Задать свой вопрос', 'question-ask')],
      ]),
    );
  }
}
