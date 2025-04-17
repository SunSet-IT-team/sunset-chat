import { useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
/**
 * Использование сокета для работы чата
 */
export const useSocket = ({ chatId, events }) => {
    const socketRef = useRef(null);
    useEffect(() => {
        const socket = io(import.meta.env.VITE_CHAT_URL || 'http://localhost:3000', {
            auth: {
                token: localStorage.getItem('token'),
            },
        });
        socketRef.current = socket;
        // Подключаемся к чату
        socket.emit('joinChat', { chatId });
        if (events?.onNewMessage)
            socket.on('newMessage', events.onNewMessage);
        if (events?.onReadReceipt)
            socket.on('readReceipt', events.onReadReceipt);
        if (events?.onError)
            socket.on('error', events.onError);
        // Посмотреть ошибки в случае подключения
        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        return () => {
            socket.off('newMessage');
            socket.off('readReceipt');
            socket.off('error');
            socket.disconnect();
        };
    }, []);
    return { socket: socketRef };
};
