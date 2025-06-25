import { Context as TelegrafContext } from 'telegraf';
import { SceneContext, SceneSession } from 'telegraf/typings/scenes';

export interface Vacancy {
  id: number;
  name: string;
  testTask: string;
}
export interface SceneJobApplication {
  currentQuestion?: number;
}

export interface IAnswer {
  questionId: number;
  answer: string;
}

export interface MySessions extends SceneSession {
  vacancy?: Vacancy;
  scene_job_application: {
    idTg: string;
    testTaskResult?: string;
    currentQuestion: number;

    profile_name?: string;
    profile_age?: number;
    profile_city?: string;

    answers?: IAnswer[];
    portfolio?: string;
    salary?: string;
  };
}

export interface IContext extends TelegrafContext {
  scene: SceneContext['scene'];
  session: MySessions;
  startPayload?: string;
  match: string[];
}
