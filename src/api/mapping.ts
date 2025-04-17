import {Message} from '../model/types';
import {getFilePath} from '../share/utils';
import {MessageDTO} from './dto';

/**
 * Состыковывает MessageDTO с нашим нормальным DTO
 */
export const mapMessageDTO = (msg: MessageDTO): Message => {
    return {
        id: msg.id,
        tempId: msg.tempId,
        chatId: msg.chatId,
        content: msg.text,
        fileUrl: msg.files[0] ? getFilePath(msg.files[0].url) : '',
        senderId: msg.senderId,
        readed: msg.isReaded,
        createdAt: new Date(msg.createdAt).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
        isLoading: msg.isLoading,
    };
};
