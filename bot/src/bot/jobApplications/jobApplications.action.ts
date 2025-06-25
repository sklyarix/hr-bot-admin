import { Action, Ctx, Message, Update } from 'nestjs-telegraf';
import { JobApplicationsService } from '../../api/job_applications/job_applications.service';
import { IContext } from '../../interfaces/context.interface';
import { EnumJobApplicationStatus } from '../../shared/enums/job_application_status.enum';
import { JobApplicationMessageService } from '../services/JobApplicationMessageService.service';
import { NotificationService } from '../services/notification.service';

@Update()
export class JobApplicationsAction {
  constructor(
    private readonly jobApplicationsApi: JobApplicationsService,
    private readonly notificationService: NotificationService,
    private readonly jobApplicationMessageService: JobApplicationMessageService,
  ) {}

  @Action(/^review_(\d+)$/)
  async statusReview(@Message('text') message: string, @Ctx() ctx: IContext) {
    const messageNotification = `
			🟡 <b>Ваш отклик заинтересовал нас!</b>
			
			HR-специалист рассмотрел ваш отклик и решил пригласить вас на следующий этап.
			
			📞 В ближайшее время с вами свяжутся для обсуждения дальнейших шагов.
			Желаем удачи!
		`;

    const jobApplicationId = +ctx.match[1];
    const jobApplication = await this.jobApplicationsApi.updateStatus(
      jobApplicationId,
      EnumJobApplicationStatus.REVIEW,
    );
    await ctx.deleteMessage();

    await this.notificationService.sendNotification(
      jobApplication.user.idTg,
      messageNotification,
    );

    await this.jobApplicationMessageService.sendMessage(ctx, jobApplicationId);
  }

  @Action(/^reject_(\d+)$/)
  async statusRejection(@Ctx() ctx: IContext) {
    const messageNotification = `
			❌ <b>Ваш отклик отклонён</b>
			
			К сожалению, ваш отклик на вакансию был отклонён.
			Не расстраивайтесь! Мы постоянно добавляем новые вакансии.
			Попробуйте подать заявку на другую позицию.
			
			📢 Следите за новыми вакансиями в нашем боте!
		`;

    const jobApplicationId = +ctx.match[1];
    const jobApplication = await this.jobApplicationsApi.updateStatus(
      jobApplicationId,
      EnumJobApplicationStatus.REJECTION,
    );
    await ctx.deleteMessage();

    await this.notificationService.sendNotification(
      jobApplication.user.idTg,
      messageNotification,
    );

    await this.jobApplicationMessageService.sendMessage(ctx, jobApplicationId);
  }

  @Action(/^accept_(\d+)$/)
  async statusAccept(@Ctx() ctx: IContext) {
    const messageNotification = `
			✅ <b>Получается мы уже почти коллеги</b>
			
			Мы рады пригласить вас стать частью нашей команды! 🚀
		`;

    const jobApplicationId = +ctx.match[1];
    const jobApplication = await this.jobApplicationsApi.updateStatus(
      jobApplicationId,
      EnumJobApplicationStatus.ACCEPT,
    );
    await ctx.deleteMessage();

    await this.notificationService.sendNotification(
      jobApplication.user.idTg,
      messageNotification,
    );

    await this.jobApplicationMessageService.sendMessage(ctx, jobApplicationId);
  }
}
