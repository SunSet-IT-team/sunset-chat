import { Socket } from 'socket.io-client';
type ChatEvents = {
    /**
     * Пришло новое сообщение
     */
    onNewMessage?: (msg: any) => void;
    /**
     * Прочитали сообщение
     */
    onReadReceipt?: (msg: any) => void;
    /**
     * Произошла ошибка
     */
    onError?: (msg: any) => void;
};
type UseSocketProps = {
    chatId: string | number;
    events?: ChatEvents;
};
/**
 * Использование сокета для работы чата
 */
export declare const useSocket: ({ chatId, events }: UseSocketProps) => {
    socket: import("react").RefObject<Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>>;
};
export {};
