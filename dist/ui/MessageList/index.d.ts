import { Chat } from '../../model/types';
import { Socket } from 'socket.io-client';
type MessageListProps = {
    chat: Chat;
    socket: React.RefObject<Socket>;
};
/**
 * Вывод списка сообщений
 */
declare const MessageList: ({ chat, socket }: MessageListProps) => import("react/jsx-runtime").JSX.Element;
export default MessageList;
