import {useRef, useEffect} from 'react';
import {io, Socket} from 'socket.io-client';

type ChatEvents = {
    /**
     * Пришло новое сообщение
     */
    onNewMessage?: (msg: any) => void;

    /**
     * Прочитали сообщение
     */
    onMessageRead?: (msg: any) => void;

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
export const useSocket = ({chatId, events}: UseSocketProps) => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io(
            import.meta.env.VITE_CHAT_URL || 'http://localhost:3000',
            {
                auth: {
                    token: localStorage.getItem('token'),
                },
            }
        );

        socketRef.current = socket;

        // Подключаемся к чату
        socket.emit('joinChat', {chatId});

        if (events?.onNewMessage) socket.on('newMessage', events.onNewMessage);
        if (events?.onMessageRead) {
            socket.on('messageRead', events.onMessageRead);
        }
        if (events?.onError) socket.on('error', events.onError);

        // Посмотреть ошибки в случае подключения
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        return () => {
            socket.off('newMessage');
            socket.off('messageRead');
            socket.off('error');
            socket.disconnect();
        };
    }, []);

    return {socket: socketRef};
};
