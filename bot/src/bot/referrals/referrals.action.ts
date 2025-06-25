import { Action, Ctx, Update } from 'nestjs-telegraf';
import { JobApplicationsService } from '../../api/job_applications/job_applications.service';
import { ReferralsService } from '../../api/referrals/referrals.service';
import { IContext } from '../../interfaces/context.interface';
import { errorUtils } from '../utils/error.utils';
import { statusJobApplicationUtils } from '../utils/statusJobApplication.utils';

@Update()
export class ReferralsAction {
  constructor(
    private readonly referralsService: ReferralsService,
    private readonly jobApplicationsApi: JobApplicationsService,
  ) {}

  @Action('my_referrals')
  async myReferrals(@Ctx() ctx: IContext) {
    try {
      const idTg = ctx.from?.id?.toString();
      if (!idTg) {
        return ctx.reply('❌ Не удалось получить ваш Telegram ID.');
      }

      const invitedUsers =
        await this.referralsService.getInvitedUsersByIdTg(idTg);

      // id всех рефералов у пользователя
      const allIdReferred = invitedUsers.map(
        (referral) => referral.referred.id,
      );

      // все отклики getAllByUserId
      const allJobAplication =
        await this.jobApplicationsApi.getAllByUsersIds(allIdReferred);

      if (allJobAplication.length > 0) {
        const message = allJobAplication
          .map((item, index) => {
            return `📝 <b>Отклик ${index + 1}</b>\n<b>Вакансия:</b> ${item.vacancy?.name || 'Не указана'}\n<b>ФИО:</b> ${item.user?.profile?.fullName || '—'}\n<b>Город:</b> ${item.user?.profile?.city || '—'}\n<b>Статус:</b> ${statusJobApplicationUtils(item.status)} `;
          })
          .join('\n\n');
        await ctx.reply(message, { parse_mode: 'HTML' });
      } else {
        await ctx.reply(
          '🚀 Пока у вас нет рефералов — самое время это изменить!',
        );
      }
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }
  }
}

/*


 
 */

/*
	@Action('myRef')
	async my_ref(@Ctx() ctx: IContext) {
	    const invitedUsers = await this.userService.getInvitedUsers(ctx.from.id);
	
	    if (!invitedUsers || invitedUsers.length === 0) {
				await ctx.reply('❌ У вас пока нет рефералов.');
	    } else {
				let message = '👥 <b>Ваши рефералы:</b>\n\n';
	
	    for (const invited of invitedUsers) {
	        try {
	            // 🔍 Гарантируем, что `getUserNameFromTelegram` возвращает строку
	            let nameUser = await this.tgService.getUserNameFromTelegram(invited.idTg);
	            nameUser = typeof nameUser === 'string' ? nameUser : 'Профиль';
	
	            // ✅ Корректный HTML для ссылки
	            const tgLink = `<a href="tg://user?id=${invited.idTg}">${nameUser}</a>`;
	
	            message += `🔹 ${tgLink} - Пригласил\n`;
	        } catch (error) {
	            console.error(`❌ Ошибка получения имени для ${invited.idTg}:`, error);
	            message += `🔹 <b>Неизвестный пользователь</b>\n`;
	        }
	    }
	
	    await ctx.reply(message, { parse_mode: 'HTML' });
	    }
			/*
	   
	   
			 */
