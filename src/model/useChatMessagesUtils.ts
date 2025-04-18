import {useQueryClient} from '@tanstack/react-query';
import {MessageDTO} from '../api/dto';

/**
 * Удобные утилиты для работы с сообщениями в чате
 */
export const useChatMessagesUtils = () => {
    const queryClient = useQueryClient();

    const addNewMessage = (message: MessageDTO) => {
        queryClient.setQueryData(
            ['chatMessages', message.chatId],
            (oldData: any) => {
                if (!oldData) return oldData;

                // Нужно для того, чтобы убирать временные сообщения
                const isMine = message.isMine;

                // Согласен, слишком тяжелое вхождение ради добавления сообщения
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any, index: number) => {
                        if (index === 0) {
                            return {
                                ...page,
                                data: {
                                    ...page.data,
                                    data: {
                                        items: isMine
                                            ? page.data.data.items.map(
                                                  (m: MessageDTO) => {
                                                      if (
                                                          m.tempId &&
                                                          m.tempId ==
                                                              message.tempId
                                                      )
                                                          return message;

                                                      return m;
                                                  }
                                              ) // Если наше - то заменяем tempMessage
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
            }
        );
    };

    const readMessage = (message: {
        messageId: string | number;
        chatId: string | number;
    }) => {
        queryClient.setQueryData(
            ['chatMessages', message.chatId],
            (oldData: any) => {
                if (!oldData) return oldData;

                // Согласен, слишком тяжелое вхождение ради добавления сообщения
                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any, index: number) => {
                        if (index === 0) {
                            return {
                                ...page,
                                data: {
                                    ...page.data,
                                    data: {
                                        items: page.data.data.items.map(
                                            (m: MessageDTO) => {
                                                if (m.id == message.messageId)
                                                    return {
                                                        ...message,
                                                        isReaded: true,
                                                    };

                                                return m;
                                            }
                                        ),
                                    },
                                },
                            };
                        }
                        return page;
                    }),
                };
            }
        );
    };

    return {
        addNewMessage,
        readMessage,
    };
};
