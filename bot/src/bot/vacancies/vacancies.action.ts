import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { VacanciesService } from '../../api/vacancies/vacancies.service';
import type { IContext } from '../../interfaces/context.interface';
import { errorUtils } from '../utils/error.utils';
import * as path from 'node:path';
import { VacanciesUiService } from './vacancies.ui.service';

@Update()
export class VacanciesAction {
  constructor(
    private readonly vacanciesApi: VacanciesService,
    private readonly vacanciesUi: VacanciesUiService,
  ) {}

  @Action(/^vacancy_(\d+)$/)
  async vacancy(@Ctx() ctx: IContext) {
    try {
      const idVacancy = +ctx.match[1];
      const vacancy = await this.vacanciesApi.getId(idVacancy);

      // TODO: Не проверяем descr и testTask (на url)

      const buttonsVacancy = Markup.inlineKeyboard([
        [Markup.button.url('📄 Описание', vacancy.description)].concat(
          vacancy.testTask
            ? [Markup.button.url('🧪 Тестовое задание', vacancy.testTask)]
            : [],
        ),
        [
          Markup.button.callback('✅ Откликнуться', `job_application`),
          Markup.button.callback('⬅️ Назад', 'back_to_vacancies'),
        ],
      ]);

      const messageText = `💼 ${vacancy.name}\n\nВы можете открыть полное описание вакансии или откликнуться`;

      ctx.session.vacancy = {
        id: vacancy.id,
        name: vacancy.name,
        testTask: vacancy.testTask,
      };

      if (vacancy.img) {
        const localPath = path.resolve(
          process.cwd(),
          'uploads',
          path.basename(vacancy.img),
        );
        await ctx.sendPhoto(
          { source: localPath },
          {
            caption: messageText,
            reply_markup: buttonsVacancy.reply_markup,
          },
        );
      } else {
        await ctx.reply(messageText, buttonsVacancy);
      }
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }
  }

  @Action('back_to_vacancies')
  async backToVacancies(@Ctx() ctx: IContext) {
    await ctx.answerCbQuery();
    await this.vacanciesUi.sendList(ctx);
  }

  @Action('job_application')
  async jobApplication(@Ctx() ctx: IContext) {
    try {
      await ctx.deleteMessage();

      if (!ctx.session.vacancy) {
        await ctx.reply('Повторите выбор вакансии');
        await this.vacanciesUi.sendList(ctx);
        return;
      }

      if (ctx.session.vacancy.testTask) {
        await this.testTask(ctx, ctx.session.vacancy.testTask);
      } else {
        await ctx.scene.enter('scene_job_application');
      }
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }
  }

  @Action('scene_job_application')
  async onTestTaskFinished(@Ctx() ctx: IContext) {
    await ctx.answerCbQuery(); // закрыть "загрузка"
    await ctx.scene.enter('scene_job_application');
  }

  // =====================
  // 👇 Сообщение о тестовом задании
  // =====================
  private async testTask(ctx: IContext, testTask: string): Promise<void> {
    await ctx.reply(
      '' +
        'Перед как откликнуться на данную вакансию вам необходимо выполнить тестовое задание. После того как вы выполните его нажмите "Выполнил".',
      Markup.inlineKeyboard([
        [
          Markup.button.url('🧪 Тестовое задание', testTask),
          Markup.button.callback('Выполнил', 'scene_job_application'),
        ],
        [Markup.button.callback('⬅️ Назад', 'back_to_vacancies')],
      ]),
    );
  }
}
