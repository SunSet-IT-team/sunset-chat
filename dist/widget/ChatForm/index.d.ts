import { Chat } from '../../model/types';
type ChatFormProps = {
    chat: Chat;
    handleCloseChat?: () => void;
};
export declare const ChatForm: ({ chat, handleCloseChat }: ChatFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
