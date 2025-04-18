import {ServerAns} from './types';

/**
 * DTO для получения данных чата
 */
export type GetChatMessagesDTO = ServerAns<{
    items: MessageDTO[];
    page: number;
    pages: number;
    total: number;
    limit: number;
}>;
/**
 * DTO для получения данных чата
 */
export type GetFileDTO = ServerAns<{
    file: FileDTO;
}>;

/**
 * Файл, который приходит с сервера
 */
export interface FileDTO {
    id: string | number;
    url: string;
    mimetype: string;
}

/**
 * Сообщение, которое приходит с сервера
 */
export interface MessageDTO {
    chatId: number | string;
    createdAt: string;
    files: FileDTO[];
    id: number | string;
    tempId?: number | string;
    isMine: boolean;
    senderId: number;
    text?: string;
    isLoading?: boolean;
    isReaded?: boolean;
}

/**
 * Загрузка файла
 */
export type UploadFileDTO = ServerAns<FileDTO[]>;
