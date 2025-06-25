import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class NotificationService {
  private readonly bot: Telegraf;
  private botToken = process.env.BOT_TOKEN || '';
  constructor() {
    this.bot = new Telegraf(this.botToken);
  }

  /**
   * 🔔 Отправка уведомления пользователю
   */
  async sendNotification(
    chatId: string,
    message: string,
    dryRun = false,
  ): Promise<void> {
    if (dryRun) {
      console.log(`💬 [dryRun] Сообщение пользователю ${chatId}:`, message);
      return;
    }

    try {
      await this.bot.telegram.sendMessage(chatId, message, {
        parse_mode: 'HTML',
      });
    } catch (error) {
      console.error(
        `❌ Ошибка отправки уведомления пользователю ${chatId}:`,
        error,
      );
    }
  }

  /**
   * 📢 Массовая рассылка (например, при добавлении вакансии)
   */
  async sendBulkNotifications(
    users: { idTg: string }[],
    message: string,
    dryRun = false,
  ): Promise<void> {
    const results = await Promise.allSettled(
      users.map((user) => this.sendNotification(user.idTg, message, dryRun)),
    );

    results.forEach((result, index) => {
      const userId = users[index].idTg;
      if (result.status === 'rejected') {
        console.error(
          `⚠️ Ошибка при отправке пользователю ${userId}:`,
          result.reason,
        );
      }
    });
  }
}
