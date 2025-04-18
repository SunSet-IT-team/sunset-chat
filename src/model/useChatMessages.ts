import {
    keepPreviousData,
    useInfiniteQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {chatApi} from '../api';
import {mapMessageDTO} from '../api/mapping';
import {useInView} from 'react-intersection-observer';
import {useEffect, useState} from 'react';

/**
 * Динамическое получение сообщений
 */
export const useChatMessages = (chatId: string | number) => {
    const {ref, inView} = useInView();
    const [canLoad, setCanLoad] = useState(false);
    const [isFirstPageLoaded, setIsFirstPageLoaded] = useState(false);
    const queryClient = useQueryClient();

    const {
        data,
        isLoading: isFirstLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isSuccess,
    } = useInfiniteQuery({
        queryKey: ['chatMessages', chatId],

        queryFn: async ({pageParam}) => {
            const response = await chatApi.getChatMessages(chatId, {
                page: pageParam,
            });

            if (!response.data.success) {
                throw new Error(
                    response.data.error || 'Ошибка получения Сообщений'
                );
            }

            return response;
        },

        getNextPageParam: (data) => {
            let nextPage = data.data.data.page + 1;
            if (nextPage > data.data.data.pages) return null;
            return nextPage;
        },

        placeholderData: keepPreviousData,
        select: (data) => {
            const messages = data.pages.flatMap(
                (page) => page?.data?.data?.items?.map(mapMessageDTO) ?? []
            );

            const seen = new Set();
            return [
                ...messages.filter((msg) => {
                    const id = msg.id || msg.tempId;
                    if (seen.has(id)) return false;
                    seen.add(id);
                    return true;
                }),
            ];
        },

        staleTime: 1000 * 60 * 5,
        initialPageParam: 1,
    });

    useEffect(() => {
        return () => {
            queryClient.removeQueries({queryKey: ['chatMessages', chatId]});
        };
    }, [chatId]);

    useEffect(() => {
        if (!isFirstPageLoaded && isSuccess) {
            setIsFirstPageLoaded(true);
        }
    }, [isSuccess, isFirstPageLoaded]);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && canLoad) {
            setCanLoad(false);
            fetchNextPage();
            setTimeout(() => {
                setCanLoad(true);
            }, 1000);
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage, canLoad]);

    const isLoading = isFirstLoading || isFetchingNextPage;

    return {data, isLoading, ref, setCanLoad, isSuccess, isFirstPageLoaded};
};
