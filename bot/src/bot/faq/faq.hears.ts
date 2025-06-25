import { Hears, Update } from 'nestjs-telegraf';
import { IContext } from '../../interfaces/context.interface';
import { FaqUiService } from './faq.ui';

@Update()
export class FaqHears {
  constructor(private readonly faqUi: FaqUiService) {}

  @Hears('ℹ️ FAQ')
  async hearsFAQ(ctx: IContext) {
    await ctx.deleteMessage();
    await this.faqUi.listFAQ(ctx);
  }
}
