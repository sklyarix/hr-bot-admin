import { Ctx, Hears, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { IContext } from '../../../interfaces/context.interface';
import { ChatGptService } from '../../services/chatGpt.service';
import { mainMenuButtons } from '../../utils/menuButtons';
import { FaqUiService } from '../faq.ui';

@Scene('questionAiScene')
export class QuestionAiScene {
  constructor(
    private readonly chatGptService: ChatGptService,
    private readonly faqUi: FaqUiService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: IContext) {
    await ctx.reply(
      `Задай свой вопрос нашему AI-ассистенту`,
      Markup.keyboard([['⬅️ Нет вопросов ']]).resize(),
    );
  }

  @Hears('⬅️ Нет вопросов')
  async back(ctx: IContext) {
    await ctx.scene.leave();
    await ctx.deleteMessage();
    await this.faqUi.listFAQ(ctx);
    await ctx.reply('Назад ⬅️', mainMenuButtons());
  }

  @On('text')
  async onText(@Message('text') message: string, @Ctx() ctx: IContext) {
    if (message == '⬅️ Нет вопросов') {
      await this.back(ctx);
      return;
    }
    await ctx.reply('🤖 Думаю...');

    const answer = await this.chatGptService.askGPT(message);

    if (!answer) {
      await this.back(ctx);
      return;
    }
    await ctx.reply(answer);
  }

  @On('message')
  async onMessage(ctx: IContext) {
    await ctx.reply('Пожалуйста, используйте текст.');
  }
}
