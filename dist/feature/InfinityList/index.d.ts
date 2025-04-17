import { SxProps, Theme } from '@mui/material';
import { ReactElement, RefCallback } from 'react';
type InfinityListProps = {
    /**
     * Данные для отображение
     */
    children: ReactElement[];
    /**
     * Стилизация
     */
    sx?: SxProps<Theme>;
    /**
     * Индикатор загрузки
     */
    isLoading?: boolean;
    /**
     * Текст о том, что не найдено
     */
    titleNoLength?: string;
    /**
     * Сцепление для react-view
     */
    observedRef: RefCallback<HTMLDivElement>;
    /**
     * Сцепление для листа
     */
    listRef?: React.RefObject<HTMLDivElement>;
};
/**
 * Отображение списка, который можно прокручивать
 */
declare const InfinityList: ({ children, isLoading, titleNoLength, observedRef, listRef, sx, }: InfinityListProps) => import("react/jsx-runtime").JSX.Element;
export default InfinityList;
