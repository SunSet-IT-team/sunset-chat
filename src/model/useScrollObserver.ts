import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Message} from './types';

/**
 * Отслеживает изменения и скроллить до конца
 */
export const useScrollObserver = (
    data: Message[],
    isFirstPageLoaded: boolean,
    setCanLoad?: (can: boolean) => void
) => {
    const messageListRef = useRef<HTMLDivElement>(null);
    const [isInited, setIsInited] = useState(false);

    useLayoutEffect(() => {
        if (!messageListRef?.current || isInited || !isFirstPageLoaded) return;

        setCanLoad?.(false);

        const el = messageListRef.current;
        el.scrollTop = el.scrollHeight;

        setTimeout(() => {
            setIsInited(true);
            setCanLoad?.(true);
        }, 50);
    }, [data.length, isFirstPageLoaded]);

    useEffect(() => {
        if (!messageListRef?.current || !isInited) return;

        const el = messageListRef.current;
        const {scrollTop, scrollHeight, clientHeight} = el;
        const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 200;

        if (isNearBottom) {
            setTimeout(() => {
                if (!el) return;
                el.scrollTo({
                    top: el.scrollHeight,
                    behavior: 'smooth',
                });
            }, 50);
        }
    }, [data.length, isInited]);

    return {
        messageListRef,
        isInited,
    };
};
