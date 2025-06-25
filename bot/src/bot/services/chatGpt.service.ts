import { Injectable } from '@nestjs/common';
import * as process from 'node:process';
import * as fs from 'fs';
import * as path from 'path';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';

@Injectable()
export class ChatGptService {
  private openai: OpenAI;
  private directory = `./uploads/data_chat_gpt/`;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async askGPT(message: string): Promise<string> {
    const files = await this.getAllFiles(this.directory);

    if (!files) {
      return '❌ Нет доступных данных для ответа.';
    }

    try {
      // 1. Извлекаем текст из файлов
      const fullText = await this.getTextFiles(files);
      // 2. Ограничиваем длину (чтобы не превысить лимит GPT)
      const maxChars = 6000;
      const trimmedText = fullText.slice(0, maxChars);
      // 3. Собираем промпт
      const systemPrompt =
        'Отвечай только на основе данных, загруженных в систему.';
      const knowledgePrompt = `Вот база знаний:\n${trimmedText}`;
      // 4. Запрос к OpenAI
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'system', content: knowledgePrompt },
          { role: 'user', content: message },
        ],
      });

      return response.choices[0].message.content || '❌ Ответ не найден';
    } catch (error) {
      console.error('Ошибка при запросе к OpenAI:', error);
      return 'Произошла ошибка при обработке запроса';
    }
  }

  private async getAllFiles(directory: string): Promise<string[]> {
    const files = await fs.promises.readdir(directory);
    const result: string[] = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.promises.stat(filePath);
      if (stat.isFile()) {
        result.push(filePath);
      }
    }
    return result;
  }

  private async getTextFiles(filePaths: string[]): Promise<string> {
    const chunks: string[] = [];

    for (const filePath of filePaths) {
      const text = await this.extractText(filePath); // твой уже готовый метод
      chunks.push(`📄 ${path.basename(filePath)}:\n${text}`);
    }
    return chunks.join('\n\n');
  }

  private async extractText(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.txt') {
      return fs.readFileSync(filePath, 'utf-8');
    } else if (ext === '.pdf') {
      const data = await pdfParse(fs.readFileSync(filePath));
      return data.text;
    } else if (ext === '.docx') {
      return 'DOCX файлы пока не поддерживаются';
    } else {
      return 'Неподдерживаемый формат файла';
    }
  }
}
