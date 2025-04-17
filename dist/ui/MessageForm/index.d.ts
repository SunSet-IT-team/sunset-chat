import { Chat } from '../../model/types';
import { Socket } from 'socket.io-client';
type MessageFormProps = {
    chat: Chat;
    socket: React.RefObject<Socket>;
};
/**
 * Форма отправки сообщения
 */
declare const MessageForm: ({ chat, socket }: MessageFormProps) => import("react/jsx-runtime").JSX.Element;
export default MessageForm;
