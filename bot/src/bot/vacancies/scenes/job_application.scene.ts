import { Injectable } from '@nestjs/common';
import { Action, Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { JobApplicationsService } from '../../../api/job_applications/job_applications.service';
import { ResumeQuestionsService } from '../../../api/resume_questions/resume_questions.service';
import { ResumesService } from '../../../api/resumes/resumes.service';
import { UserProfilesService } from '../../../api/user_profiles/user_profiles.service';
import { UsersService } from '../../../api/users/users.service';

import { IContext } from '../../../interfaces/context.interface';
import { EnumJobApplicationStatus } from '../../../shared/enums/job_application_status.enum';
import { IUser } from '../../../shared/user/user.interface';
import { JobApplicationMessageService } from '../../services/JobApplicationMessageService.service';
import { errorUtils } from '../../utils/error.utils';
import { mainMenuButtons } from '../../utils/menuButtons';
import { VacanciesUiService } from '../vacancies.ui.service';

interface IQuestion {
  name: string;
  message: string;
  validator: (input: string) => boolean;
  errorMessage: string;
}

@Injectable()
@Scene('scene_job_application')
export class SceneJobApplication {
  // Вопросы к кандидату
  private allQuestion: IQuestion[] = [];
  constructor(
    private readonly usersApi: UsersService,
    private readonly userProfileApi: UserProfilesService,
    private readonly vacanciesUi: VacanciesUiService,
    private readonly resumeApi: ResumesService,
    private readonly resumeQuestionsApi: ResumeQuestionsService,
    private readonly jobApplicationsApi: JobApplicationsService,
    private readonly jobApplicationMessageService: JobApplicationMessageService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: IContext) {
    try {
      const idTg = ctx.from?.id?.toString();
      if (!idTg) {
        await ctx.reply('❌ Не удалось получить ваш Telegram ID.');
        await ctx.scene.leave();
        return this.vacanciesUi.sendList(ctx);
      }
      ctx.session.scene_job_application = {
        idTg: idTg,
        currentQuestion: 0,
        answers: [],
      };
      await ctx.reply(
        `Приветствую, будущий коллега! \n\nЧтобы присоединиться к мультидисциплинарному агентству FABRIKA и работать с лидерами ниши iGaming, нужно ответить на несколько вопросов. Это займет не более 10 минут.\n\nМы ценим твое время и наша беседа будет более предметной, если ты пройдешь этот опрос до конца 🤝`,
        Markup.keyboard([['⬅️ Вернуться к списку вакансий']]).resize(),
      );
      if (ctx.session.vacancy?.testTask) {
        await ctx.reply(`Отправь решенное тестовое задание`);
      } else {
        await this.start(ctx);
      }
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }

    // Проверить наличие профиля
    /// если устраивает продолжаем не заполняем заново

    // Заполняем профиль
    // fullName age city

    // Есть ли тестовое к вакансии?

    // Есть ли вопросы к вакансии?

    //Отправить данные в БД и Группу
  }

  @Action('__old_profile')
  async oldProfile(ctx: IContext) {
    await ctx.deleteMessage();
    ctx.session.scene_job_application.currentQuestion = 2;

    await this.nextField(ctx);
  }

  @Action('__new_profile')
  async newProfile(ctx: IContext) {
    await ctx.deleteMessage();
    await this.askField(ctx);
  }

  private async nextField(ctx: IContext) {
    ctx.session.scene_job_application.currentQuestion++;

    if (
      ctx.session.scene_job_application.currentQuestion <
      this.allQuestion.length
    ) {
      await this.askField(ctx);
    } else {
      await this.create_jobResponses(ctx);
    }
  }

  private async askField(ctx: IContext) {
    const currentField =
      this.allQuestion[ctx.session.scene_job_application.currentQuestion];
    await ctx.reply(currentField.message);
  }

  // Проверка наличие заполненного профиля
  private async checkRelevanceProfile(ctx: IContext, user: IUser) {
    const textInfo = `Вы ранее откликались у нас на вакансию. \n \n Данные совпадают? \n\n ФИО: ${user.profile.fullName} \n Возраст: ${user.profile.age} \n Город: ${user.profile.city} `;
    const buttons = Markup.inlineKeyboard([
      [Markup.button.callback('✅ Да', '__old_profile')],
      [Markup.button.callback('❌ Нет', '__new_profile')],
    ]);
    await ctx.reply(textInfo, buttons);
  }

  // обновить данные Profile и отправить отклик
  private async create_jobResponses(ctx: IContext) {
    try {
      let user: IUser;

      // Обновляем данные профиля
      if (ctx.session.scene_job_application.profile_name) {
        const profile = {
          fullName: ctx.session.scene_job_application.profile_name,
          age: ctx.session.scene_job_application.profile_age,
          city: ctx.session.scene_job_application.profile_city,
        };

        user = await this.userProfileApi.updateUserProfile(
          profile,
          ctx.session.scene_job_application.idTg,
        );
      } else {
        user = await this.usersApi.findUserByIdTg(
          ctx.session.scene_job_application.idTg,
        );
      }

      //Резюме
      const dataResume = {
        portfolioLink: ctx.session.scene_job_application.portfolio || '',
        salary: ctx.session.scene_job_application.salary || '',
        userId: user.id,
        answers: ctx.session.scene_job_application.answers,
      };
      const resume = await this.resumeApi.create(dataResume);

      // Отклик
      const dataJobApplication = {
        testTaskResult: ctx.session.scene_job_application.testTaskResult || '',
        status: EnumJobApplicationStatus.NO_REVIEW,
        userId: user.id,
        resumeId: resume.id,
        vacancyId: ctx.session.vacancy!.id,
      };
      const jobApplication =
        await this.jobApplicationsApi.create(dataJobApplication);

      // Отправить сообщение в группу
      await this.jobApplicationMessageService.sendMessage(
        ctx,
        jobApplication.id,
      );

      // Закрываем сцену
      await ctx.reply(
        'Анкета успешно отправлена! \n\nHR изучит и напишет тебе 🤝',
        mainMenuButtons(),
      );
      await ctx.scene.leave();
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }
  }

  // Собрать все вопросы в allQuestion
  private async buildQuestion(ctx: IContext) {
    try {
      ctx.session.scene_job_application.answers = [];
      const apiQuestions = await this.resumeQuestionsApi.getAll();
      const dynamicQuestions: IQuestion[] = apiQuestions.map((q) => {
        return {
          name: `question_${q.id}`,
          message: q.text,
          validator: (input: string) => {
            if (q.minLength && input.trim().length < q.minLength) {
              return false;
            }
            if (q.validationRegex) {
              try {
                const regex = new RegExp(q.validationRegex);
                if (!regex.test(input)) return false;
              } catch (e) {
                console.warn(`Invalid regex in question ${q.id}`, e);
                return false;
              }
            }
            return true;
          },
          errorMessage: q.errorMessage || 'Неверный ответ. Попробуйте снова.',
        };
      });

      const profileQuestions = [
        {
          name: 'profile_name',
          message: 'Укажи свое ФИО:',
          validator: (input: string) => input.trim().split(/\s+/).length >= 2,
          errorMessage:
            'ФИО должно содержать как минимум два слова (имя и фамилию).',
        },
        {
          name: 'profile_age',
          message: 'Укажи свой возраст:',
          validator: (input) => !isNaN(Number(input)) && Number(input) > 0,
          errorMessage: 'Возраст должен быть положительным числом.',
        },
        {
          name: 'profile_city',
          message: 'В каком городе проживаешь?',
          validator: (input: string) => /^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(input),
          errorMessage:
            'Название города может содержать только буквы, пробелы и дефисы.',
        },
      ];
      const requestQuestion = [
        {
          name: 'salary',
          message: 'Какие у тебя зарплатные ожидания?',
          validator: (input: string) => {
            const cleaned = input.replace(/\s/g, '').toLowerCase();

            // Проверка на наличие чисел (например, 120000, 150к, 200-250)
            const hasNumber = /\d{2,3}(\d{3})?/.test(cleaned);
            const badAnswers = [
              'достаточно',
              'норм',
              'по рынку',
              'любая',
              'пока не знаю',
              'не важно',
            ];
            const isTooVague = badAnswers.some((phrase) =>
              cleaned.includes(phrase),
            );

            return hasNumber && !isTooVague;
          },
          errorMessage:
            'Пожалуйста, укажи примерный диапазон или сумму — например: "от 150 000", "200–250 тыс.", "не ниже 120 000".',
        },
        {
          name: 'portfolio',
          message: 'Прикрепи ссылку к своему портфолио',
          validator: (input: string) => /^https?:\/\/.+$/.test(input),
          errorMessage:
            'Пожалуйста, отправь корректную ссылку, начинающуюся с http(s):// (например: https://portfolio.me или https://github.com/...).',
        },
      ];

      // объединяем
      this.allQuestion = [
        ...profileQuestions,
        ...dynamicQuestions,
        ...requestQuestion,
      ];
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }
  }

  // Старт
  private async start(ctx: IContext) {
    try {
      await this.buildQuestion(ctx);
      const user = await this.usersApi.findUserByIdTg(
        ctx.session.scene_job_application.idTg,
      );

      if (
        user.profile.fullName != null ||
        user.profile.city != null ||
        user.profile.age != null
      ) {
        await this.checkRelevanceProfile(ctx, user);
      } else {
        await this.askField(ctx);
      }
    } catch (error) {
      await errorUtils(ctx, error as Error);
    }
  }

  @On('text')
  async onText(@Message('text') messageUser: string, @Ctx() ctx: IContext) {
    if (messageUser == '⬅️ Вернуться к списку вакансий') {
      await ctx.scene.leave();
      return this.vacanciesUi.sendList(ctx);
    }

    if (
      !ctx.session.scene_job_application.testTaskResult &&
      ctx.session.vacancy?.testTask
    ) {
      const input = messageUser.trim();

      const isValidUrl = /^https?:\/\/[^\s]+$/.test(input);

      if (!isValidUrl) {
        await ctx.reply(
          'Пожалуйста, отправь корректную ссылку, начинающуюся с http:// или https://',
        );
        return;
      }

      ctx.session.scene_job_application.testTaskResult = input;
      await this.start(ctx);
      return;
    }

    const { name, validator, message, errorMessage } =
      this.allQuestion[ctx.session.scene_job_application.currentQuestion];

    if (validator && !validator(messageUser)) {
      await ctx.reply(errorMessage || 'Неверное значение. Попробуйте снова.');
      return;
    }

    if (name.startsWith('question_')) {
      console.log(
        'ctx.session.scene_job_application.answers =',
        ctx.session.scene_job_application.answers,
      );
      const questionId = Number(name.split('_')[1]); // извлекаем всё после "description_"
      ctx.session.scene_job_application.answers!.push({
        questionId,
        answer: messageUser,
      });
    } else {
      ctx.session.scene_job_application[name] = messageUser;
    }
    await this.nextField(ctx);
  }
}
