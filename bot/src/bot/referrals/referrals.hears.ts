import { Hears, Update } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { ReferralCodesService } from '../../api/referral_codes/referral_codes.service';

import type { IContext } from '../../interfaces/context.interface';
import * as path from 'path';
import { errorUtils } from '../utils/error.utils';

@Update()
export class ReferralsHears {
  constructor(private readonly referralCodesApi: ReferralCodesService) {}

  // TODO: Hears в переменные

  @Hears('🧑‍🧑‍🧒‍🧒Реф. программа')
  async refProgram(ctx: IContext) {
    try {
      const idTg = ctx.from?.id?.toString();
      if (!idTg) {
        return ctx.reply('❌ Не удалось получить ваш Telegram ID.');
      }

      const refCode = await this.referralCodesApi.getCodeOrCreateCode(idTg);

      const buttons = Markup.inlineKeyboard([
        [
          Markup.button.url(
            'Подробное описание',
            ReferralsHears.URL_DESCRIPTION,
          ),
        ],
        [Markup.button.callback('Мои рефераллы', 'my_referrals')],
      ]);
      // TODO!!! [Markup.button.callback('Получить выплату', 'b1')],

      const refLink = `${process.env.URL_BOT}?start=${refCode}`;

      const text = `Приглашайте друзей и зарабатывайте вместе! 🎉\n\nКак это работает?\n\n✅ Пригласите друга по вашей уникальной реферальной ссылке;\n✅ Условие-2;\n✅ Условие-3;\n\nВаша реферальная ссылка: ${refLink} \n\nПрисоединяйтесь прямо сейчас! 🔥`;

      await ctx.sendPhoto(
        { source: ReferralsHears.IMG_START },
        {
          caption: text,
          reply_markup: buttons.reply_markup,
        },
      );
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }
  }

  // =====================
  // 📝 Статические данные
  // =====================

  private static readonly IMG_START = path.resolve(
    process.cwd(),
    'src/assets/images/startImg.png',
  );
  private static readonly URL_DESCRIPTION =
    'https://telegra.ph/EHto-vremennaya-ssylka-04-24';
}
