/**
 * Динамическое получение сообщений
 */
export declare const useChatMessages: (chatId: string | number) => {
    data: import("./types").Message[];
    isLoading: boolean;
    ref: (node?: Element | null) => void;
    setCanLoad: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
