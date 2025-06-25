import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { IContext } from '../../interfaces/context.interface';
import { FaqUiService } from './faq.ui';

@Update()
export class FaqAction {
  constructor(private readonly faqUi: FaqUiService) {}

  @Action('question-1')
  async question1(@Ctx() ctx: IContext) {
    await ctx.deleteMessage();
    await ctx.reply(
      'Почему стоит работать в FABRIKA \n\n' +
        'FABRIKA — первый и единственный продюсерский центр в нише iGaming. Разрабатываем уникальные визуальные и PR решения для создания эффективного позиционирования и продвижения в digital пространстве. Работаем только с лидерами ниши, а это значит, что есть возможность создавать такой контент, который влияет на весь рынок ниши iGaming. \n\n' +
        'Работа с нами — вызов самому себе. Удаленная и комфортная занятость, адаптивный подход к процессам, забота и развитие за счет компании, но при этом амбициозные задачи каждый день.',
      Markup.inlineKeyboard([
        [Markup.button.callback('⬅️ Назад', 'back_to_faq')],
      ]),
    );
  }

  @Action('question-2')
  async question2(@Ctx() ctx: IContext) {
    await ctx.deleteMessage();
    await ctx.reply(
      '— Удаленный формат работы \n\n' +
        '— Рабочий день с 11:00 до 19:00 по МСК \n\n' +
        '— Оплачиваемые больничные и отпуска \n\n' +
        '— Конкурентная заработная плата с возможностью роста \n\n' +
        '— Приятные бонусы за счет компании',
      Markup.inlineKeyboard([
        [Markup.button.callback('⬅️ Назад', 'back_to_faq')],
      ]),
    );
  }

  @Action('question-3')
  async question3(@Ctx() ctx: IContext) {
    await ctx.deleteMessage();
    await ctx.reply(
      'Мы за индивидуальный подход к кандидатам. При выборе заработной платы мы учитываем пожелания человека, его опыт, навыки и мотивацию. \n\nМы точно уверены, что сможем сделать достойное предложение для каждого кандидата на этапе оффера.',
      Markup.inlineKeyboard([
        [Markup.button.callback('⬅️ Назад', 'back_to_faq')],
      ]),
    );
  }

  @Action('question-4')
  async question4(@Ctx() ctx: IContext) {
    await ctx.deleteMessage();
    await ctx.reply(
      'Мы получаем много запросов и активно их обрабатываем. Мы обязательно вернемся к тебе как можно скорее!',
      Markup.inlineKeyboard([
        [Markup.button.callback('⬅️ Назад', 'back_to_faq')],
      ]),
    );
  }

  @Action('question-5')
  async question5(@Ctx() ctx: IContext) {
    await ctx.deleteMessage();
    await ctx.reply(
      'Экспертиза в индустрии — преимущество, и на некоторых должностях без неё может быть сложно. Однако мы открыты к сотрудничеству с кандидатами, у которых интересный опыт из других сфер.',
      Markup.inlineKeyboard([
        [Markup.button.callback('⬅️ Назад', 'back_to_faq')],
      ]),
    );
  }

  @Action('question-ask')
  async question_ask(@Ctx() ctx: IContext) {
    await ctx.deleteMessage();
    await ctx.scene.enter('questionAiScene');
  }

  @Action('back_to_faq')
  async backToFAQ(@Ctx() ctx: IContext) {
    try {
      await ctx.deleteMessage();
    } catch (e) {
      console.error('Ошибка при удалении сообщения', e.message);
    }
    await this.faqUi.listFAQ(ctx);
  }
}
