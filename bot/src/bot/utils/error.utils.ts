import type { IContext } from '../../interfaces/context.interface';

export async function errorUtils(ctx: IContext, error: Error) {
  // 1. Уведомляем клиента
  await ctx.reply(
    '⚠️ Вы столкнулись с ошибкой!\n\n' +
      'Мы уже работаем над её исправлением. 🙏\n\n' +
      'Нажмите /start, чтобы перезапустить бота.',
  );

  // 2. Уведомляем разработчиков в канал
  try {
    const errorMessage =
      `🚨 Ошибка у пользователя\n` +
      `👤 Telegram ID: ${ctx.from?.id}\n` +
      `❗ Ошибка: ${error.message}\n` +
      `🕒 Время: ${new Date().toISOString()}`;

    if (!process.env.TG_CHANNEL_ERROR_ID) {
      return new Error('❌ Не указан TG_CHANNEL_ERROR_ID');
    }

    await ctx.telegram.sendMessage(
      process.env.TG_CHANNEL_ERROR_ID,
      errorMessage,
    );
  } catch (sendError) {
    console.error('❌ Не удалось отправить ошибку в канал:', sendError);
  }
}
