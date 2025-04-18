import { MessageDTO } from '../api/dto';
/**
 * Удобные утилиты для работы с сообщениями в чате
 */
export declare const useChatMessagesUtils: () => {
    addNewMessage: (message: MessageDTO) => void;
    readMessage: (message: {
        messageId: string | number;
        chatId: string | number;
    }) => void;
};
