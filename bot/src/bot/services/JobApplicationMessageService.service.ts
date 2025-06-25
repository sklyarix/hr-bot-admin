import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { JobApplicationsService } from '../../api/job_applications/job_applications.service';
import type { IContext } from '../../interfaces/context.interface';
import { EnumJobApplicationStatus } from '../../shared/enums/job_application_status.enum';
import type { IJobApplication } from '../../shared/job_application/job_application.interface';

@Injectable()
export class JobApplicationMessageService {
  private targetChannel = process.env.ID_GROUP_ZAYVKI || '';

  constructor(private readonly jobApplicationsApi: JobApplicationsService) {}

  private messageStatus(status: EnumJobApplicationStatus) {
    switch (status) {
      case EnumJobApplicationStatus.NO_REVIEW:
        return '⚪ Не просмотрено ⚪';
      case EnumJobApplicationStatus.REVIEW:
        return '🟠 На рассмотрении 🟠';
      case EnumJobApplicationStatus.ACCEPT:
        return '🟢 Принят 🟢';
      case EnumJobApplicationStatus.REJECTION:
        return '🔴 Отказ 🔴';
    }
  }

  private buildMessage(dataJobApplication: IJobApplication): string {
    console.log('dataJobApplication =', dataJobApplication.resume.answers);

    //!!!TODDO
    const answersText =
      dataJobApplication.resume.answers
        ?.map(
          (resumeAnswer) =>
            `— <i>${resumeAnswer.question.text || 'Вопрос удалён'}</i>\n${resumeAnswer.answer}`,
        )
        .join('\n\n') || 'Ответы не найдены';

    return `
			📝 ${this.messageStatus(dataJobApplication.status)}
			<b>id-отклика:</b> <code>${dataJobApplication.id}</code>
			<b>Вакансия:</b> ${dataJobApplication.vacancy.name}
			<b>Пользователь:</b> ${dataJobApplication.user.profile.fullName}
			<b>ФИО:</b> ${dataJobApplication.user.profile.fullName}
			<b>Возраст:</b> ${dataJobApplication.user.profile.age}
			<b>Город:</b> ${dataJobApplication.user.profile.city}
			
			<b>Описание:</b>\n\n${answersText}
			
			<b>Зарплатная вилка:</b> ${dataJobApplication.resume.salary}
	
			<b>Приложенное тестовое:</b> ${dataJobApplication.testTaskResult || 'Не предусмотренно'}
			<b>Портфолио:</b> ${dataJobApplication.resume.portfolioLink}
		`;
  }

  private buildButtons(dataJobApplication: IJobApplication) {
    if (
      [
        EnumJobApplicationStatus.REJECTION,
        EnumJobApplicationStatus.ACCEPT,
      ].includes(dataJobApplication.status)
    ) {
      return undefined; // ❌ Не показываем кнопки, если отклонено или принято
    }

    switch (dataJobApplication.status) {
      case EnumJobApplicationStatus.NO_REVIEW:
        return Markup.inlineKeyboard([
          [
            Markup.button.callback(
              '🟡 Рассмотреть',
              `review_${dataJobApplication.id}`,
            ),
          ],
          [
            Markup.button.callback(
              '🔴 Отказать',
              `reject_${dataJobApplication.id}`,
            ),
          ],
        ]).reply_markup;

      case EnumJobApplicationStatus.REVIEW:
        return Markup.inlineKeyboard([
          [
            Markup.button.callback(
              '🟢 Принять',
              `accept_${dataJobApplication.id}`,
            ),
          ],
          [
            Markup.button.callback(
              '🔴 Отказать',
              `reject_${dataJobApplication.id}`,
            ),
          ],
        ]).reply_markup;

      default:
        return undefined; // Если статус неизвестен, кнопки не показываем
    }
  }

  public async sendMessage(ctx: IContext, idJobApplication: number) {
    const dataJobApplication =
      await this.jobApplicationsApi.getDetailById(idJobApplication);
    const message = this.buildMessage(dataJobApplication);
    const buttons = this.buildButtons(dataJobApplication);

    const options: any = {
      caption: message,
      parse_mode: 'HTML',
      reply_markup: buttons,
    };
    await ctx.telegram.sendMessage(this.targetChannel, message, options);

    /*
		else if (resume.type === ResumeType.FILE && resume.link) {
			await ctx.telegram.sendDocument(this.targetChannel, {
        url: resume.link,
        filename: `resume_${dataJobApplication.id}.pdf`
      }, options);
		}
		 */
  }
}
