/**
 * Чат
 */
export type Chat = {
    id: string | number;
    messages: Message[];
    chatUser: ChatUser;
    additionalInfo?: string;
    currentUserId: string | number;
};
/**
 * Сообщение
 */
export type Message = {
    id: number | string;
    tempId: number | string;
    chatId: number | string;
    content?: string;
    fileUrl?: string;
    senderId: number;
    readed: boolean;
    createdAt: string;
    isLoading?: boolean;
};
/**
 * Пользователь чата
 */
export type ChatUser = {
    id: string | number;
    name: string;
    imagePath?: string;
};
