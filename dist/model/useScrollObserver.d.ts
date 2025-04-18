import { Message } from './types';
/**
 * Отслеживает изменения и скроллить до конца
 */
export declare const useScrollObserver: (data: Message[], isFirstPageLoaded: boolean, setCanLoad?: (can: boolean) => void) => {
    messageListRef: import("react").RefObject<HTMLDivElement>;
    isInited: boolean;
};
