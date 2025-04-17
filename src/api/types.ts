import {AxiosPromise} from 'axios';
import {GetChatMessagesDTO} from './dto';

/**
 * Интерфейс для API чата
 */
export interface СhatApiMethods {
    /**
     * Получить сообщения чата
     */
    getChatMessages: (
        chatId: string | number,
        params: ChatApiGetChatMessagesParams
    ) => AxiosPromise<GetChatMessagesDTO>;
}

export type ChatApiGetChatMessagesParams = {
    limit?: number;
    page?: number;
};

/**
 * Ответ сервера
 */
export type ServerAns<T> = {
    data: T;
    success: boolean;
    error?: string;
};
