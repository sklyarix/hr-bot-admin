import { Ctx, Hears, Update } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import type { IContext } from '../../interfaces/context.interface';

@Update()
export class ContactsHears {
  constructor() {}

  @Hears('📞 Контакты')
  async contacts(@Ctx() ctx: IContext) {
    await ctx.deleteMessage();
    await this.contentContacts(ctx);
  }

  async contentContacts(ctx: IContext) {
    await ctx.reply(
      'Контактные данные:',
      Markup.inlineKeyboard([
        [Markup.button.url('Перейти на сайт', 'https://fabrikapr.com/')],
        [Markup.button.url('HRD', 'https://t.me/ivannasapcho')],
        [Markup.button.url('Inst', 'https://www.instagram.com/fabrikapr')],
      ]),
    );
  }
}
