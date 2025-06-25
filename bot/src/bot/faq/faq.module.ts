import { Module } from '@nestjs/common';

import { ServicesModule } from '../services/services.module';
import { FaqAction } from './faq.action';
import { FaqHears } from './faq.hears';
import { FaqUiService } from './faq.ui';
import { QuestionAiScene } from './scenes/questionAi.scene';

@Module({
  imports: [ServicesModule],
  providers: [FaqHears, FaqAction, FaqUiService, QuestionAiScene],
  exports: [FaqUiService],
})
export class FaqModule {}
