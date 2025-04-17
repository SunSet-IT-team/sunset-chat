/**
 * Получить нормальный путь к файлам
 */
export const getFilePath = (path) => {
    if (!path)
        return '';
    const host = import.meta.env.VITE_CHAT_URL || '';
    return `${host}/uploads/${path}`;
};
