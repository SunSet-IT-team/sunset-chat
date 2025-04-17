import { Message } from '../../model/types';
type ChatMessageProps = Message;
/**
 * Шаблон сообщения чата
 */
export declare const ChatMessage: ({ senderId, content, createdAt, readed, isLoading, fileUrl, ...m }: ChatMessageProps) => import("react/jsx-runtime").JSX.Element;
export {};
