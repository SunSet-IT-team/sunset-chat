import { useEffect, useRef, useState } from 'react';
/**
 * Отслеживает изменения и скроллить до конца
 */
export const useScrollObserver = (data) => {
    const messageListRef = useRef(null); // Реф на контейнер списка
    // Для того, чтобы сначала инициализировать, а потом можно было запрашивать страницы
    const [isInited, setIsInited] = useState(false);
    // Сразу крутим в низ
    useEffect(() => {
        if (!messageListRef || !messageListRef.current)
            return;
        setTimeout(() => {
            if (!messageListRef || !messageListRef.current)
                return;
            messageListRef.current.scrollTo({
                top: messageListRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }, 50);
        setTimeout(() => {
            if (!messageListRef || !messageListRef.current)
                return;
            setIsInited(true);
        }, 1000);
    }, [messageListRef.current]);
    // Скролл вниз при изменении messages
    useEffect(() => {
        if (!messageListRef || !messageListRef.current || !isInited)
            return;
        // Если скролл уже внизу или почти внизу — скроллим
        const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
        const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 200;
        if (isNearBottom) {
            // Небольшая задержка для гарантированного обновления DOM
            setTimeout(() => {
                if (!messageListRef || !messageListRef.current)
                    return;
                messageListRef.current.scrollTo({
                    top: messageListRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }, 50);
        }
    }, [data.length]);
    return {
        messageListRef,
        isInited,
    };
};
