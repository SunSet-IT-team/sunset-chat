import { useQueryClient } from '@tanstack/react-query';
/**
 * Удобные утилиты для работы с сообщениями в чате
 */
export const useChatMessagesUtils = () => {
    const queryClient = useQueryClient();
    const addNewMessage = (message) => {
        queryClient.setQueryData(['chatMessages', message.chatId], (oldData) => {
            if (!oldData)
                return oldData;
            // Нужно для того, чтобы убирать временные сообщения
            const isMine = message.isMine;
            // Согласен, слишком тяжелое вхождение ради добавления сообщения
            return {
                ...oldData,
                pages: oldData.pages.map((page, index) => {
                    if (index === 0) {
                        return {
                            ...page,
                            data: {
                                ...page.data,
                                data: {
                                    items: isMine
                                        ? page.data.data.items.map((m) => {
                                            if (m.tempId &&
                                                m.tempId ==
                                                    message.tempId)
                                                return message;
                                            return m;
                                        }) // Если наше - то заменяем tempMessage
                                        : [
                                            message,
                                            ...page.data.data.items,
                                        ], // Если не наше -то просто добавляем в начало
                                },
                            },
                        };
                    }
                    return page;
                }),
            };
        });
    };
    return {
        addNewMessage,
    };
};
