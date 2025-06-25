import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { VacanciesService } from '../../api/vacancies/vacancies.service';
import type { IContext } from '../../interfaces/context.interface';
import { errorUtils } from '../utils/error.utils';
import { mainMenuButtons } from '../utils/menuButtons';

@Injectable()
export class VacanciesUiService {
  constructor(private readonly vacanciesApi: VacanciesService) {}

  async sendList(ctx: IContext) {
    try {
      const idTg = ctx.from?.id?.toString();
      if (!idTg) {
        await ctx.reply('❌ Не удалось получить ваш Telegram ID.');
        return;
      }

      const allVacancy = await this.vacanciesApi.getAll();
      if (allVacancy.length === 0) {
        await ctx.reply('К сожалению, нет вакансий');
        return;
      }
      await ctx.reply('📌 Актуальные вакансии', mainMenuButtons());

      await ctx.reply(
        'Вакансии:',
        Markup.inlineKeyboard(
          allVacancy.map((vacancy) => [
            Markup.button.callback(
              `⚡️️ ${vacancy.name}`,
              `vacancy_${vacancy.id}`,
            ),
          ]),
        ),
      );
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }
  }
}
