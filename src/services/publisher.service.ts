import type { Api } from 'grammy';
import { getConfig } from '../config/env.js';
import { logger } from '../logger/logger.js';

const pubLogger = logger.child({ module: 'PublisherService' });

/**
 * Управляет публикацией сообщений (тренировок) в заданный Telegram-канал/чат.
 */
export class PublisherService {
  /**
   * Инициализирует PublisherService.
   * @param api Экземпляр Grammy API, через который будут отправляться сообщения.
   */
  constructor(private readonly api: Api) {}

  /**
   * Публикует HTML-текст в канал, указанный в конфигурации (PUBLISH_CHAT_ID).
   * @param formattedText HTML строка для публикации.
   * @returns Идентификатор отправленного сообщения (message_id).
   */
  async publish(formattedText: string): Promise<number> {
    const config = getConfig();

    try {
      pubLogger.info({ chatId: config.PUBLISH_CHAT_ID }, 'Publishing message to channel');

      const msg = await this.api.sendMessage(config.PUBLISH_CHAT_ID, formattedText, {
        parse_mode: 'HTML',
      });

      pubLogger.info({ messageId: msg.message_id }, 'Message published successfully');
      return msg.message_id;
    } catch (error) {
      pubLogger.error({ err: error, chatId: config.PUBLISH_CHAT_ID }, 'Failed to publish message');
      throw error;
    }
  }
}
