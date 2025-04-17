import { Message } from './types';
/**
 * Отслеживает изменения и скроллить до конца
 */
export declare const useScrollObserver: (data: Message[]) => {
    messageListRef: import("react").RefObject<HTMLDivElement>;
    isInited: boolean;
};
