import { Hears, Update } from 'nestjs-telegraf';

import type { IContext } from '../../interfaces/context.interface';
import { mainMenuButtons } from '../utils/menuButtons';

import { VacanciesUiService } from './vacancies.ui.service';

@Update()
export class VacanciesHears {
  constructor(private readonly vacanciesUi: VacanciesUiService) {}

  @Hears('👨‍💻 Карьера в FABRIKA')
  async listVacancy(ctx: IContext) {
    await this.vacanciesUi.sendList(ctx);
  }

  @Hears('⬅️ Вернуться к списку вакансий')
  async backListVacancy(ctx: IContext) {
    await ctx.deleteMessage();
    await ctx.scene.leave();
    await this.vacanciesUi.sendList(ctx);

    await ctx.reply(
      '❌ Отклик не отправлен, необходимо заполнить до конца.',
      mainMenuButtons(),
    );
  }
}
