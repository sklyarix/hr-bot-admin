import { Ctx, Start, Update } from 'nestjs-telegraf';
import * as console from 'node:console';
import { ReferralCodesService } from '../api/referral_codes/referral_codes.service';
import { ReferralsService } from '../api/referrals/referrals.service';
import { UsersService } from '../api/users/users.service';
import type { IContext } from '../interfaces/context.interface';

import * as path from 'path';
import { errorUtils } from './utils/error.utils';
import { mainMenuButtons } from './utils/menuButtons';

@Update()
export class BotUpdate {
  constructor(
    private readonly usersApi: UsersService,
    private readonly referralsApi: ReferralsService,
    private readonly referralCodesApi: ReferralCodesService,
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: IContext) {
    try {
      console.log('1');
      await this.leaveSceneIfActive(ctx);
      console.log('2');
      const idTg = ctx.from?.id?.toString();
      if (!idTg) {
        await ctx.reply('❌ Не удалось получить ваш Telegram ID.');
        return;
      }
      console.log('3');
      const refCode = ctx.startPayload || null;
      console.log('4');
      console.log(idTg, refCode);
      await this.registerUser(idTg, refCode);
      console.log('5');
      await ctx.sendPhoto(
        { source: BotUpdate.IMG_START },
        {
          caption: BotUpdate.MESSAGE_START,
          reply_markup: mainMenuButtons().reply_markup,
        },
      );
    } catch (error) {
      await ctx.reply('😢 Произошла ошибка при старте. Попробуйте позже.');
      await errorUtils(ctx, error as Error);
    }
  }

  // =====================
  // 🤖 Команды Telegram
  // =====================
  async commandsBot(ctx: IContext): Promise<void> {
    await ctx.telegram.setMyCommands([
      { command: 'start', description: 'Start the bot' },
      { command: 'end', description: 'END the bot' },
    ]);
  }

  // =====================
  // 👇 Вспомогательные методы
  // =====================

  private async leaveSceneIfActive(ctx: IContext): Promise<void> {
    try {
      if (ctx.scene?.current) {
        await ctx.scene.leave();
      }
    } catch (e) {
      console.warn('[scene.leave] Ошибка при выходе из сцены:', e.message);
    }
  }

  private async registerUser(
    idTg: string,
    refCode: string | null,
  ): Promise<void> {
    const existingUser = await this.usersApi.findUserByIdTg(idTg);

    if (existingUser) return;

    const newUser = await this.usersApi.createUser({ idTg });

    if (refCode) {
      const referrer = await this.referralCodesApi.findUserByCode(refCode);
      if (referrer?.id !== newUser.id) {
        await this.referralsApi.create({
          referrerId: referrer.id,
          referredId: newUser.id,
        });
      }
    }
  }

  // =====================
  // 📝 Статические данные
  // =====================

  private static readonly MESSAGE_START = `
Привет! 👋

Это HR-бот первого и единственного продюсерского центра в нише iGaming — FABRIKA 🎮

⚡ Здесь ты можешь начать карьеру с нами!

📌 Смотри актуальные вакансии
📬 Отправляй отклик
🗓 До встречи на собеседовании!
  `;
  private static readonly IMG_START = path.resolve(
    process.cwd(),
    'src/assets/images/startImg.png',
  );
}
