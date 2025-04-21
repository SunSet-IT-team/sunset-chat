import { Message } from '../../model/types';
import { Socket } from 'socket.io-client';
type ChatMessageProps = {
    message: Message;
    currentUserId: string | number;
    socket: React.RefObject<Socket>;
};
/**
 * Шаблон сообщения чата
 */
export declare const ChatMessage: ({ message, currentUserId, socket }: ChatMessageProps) => import("react/jsx-runtime").JSX.Element;
export {};
