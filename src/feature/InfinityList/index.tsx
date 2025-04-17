import {
    Box,
    CircularProgress,
    Stack,
    SxProps,
    Theme,
    Typography,
} from '@mui/material';
import {useStyles} from './styles';
import {ReactElement, RefCallback} from 'react';

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
const InfinityList = ({
    children,
    isLoading,
    titleNoLength,
    observedRef,
    listRef,
    sx,
}: InfinityListProps) => {
    const styles = useStyles();

    return (
        <Box sx={styles.box} ref={listRef}>
            {children && children.length ? (
                <>
                    {observedRef !== undefined && <Box ref={observedRef} />}
                    {isLoading && (
                        <CircularProgress
                            size={64}
                            thickness={4}
                            sx={styles.loader}
                        />
                    )}
                    <Stack direction={'column'} gap={'12px'} sx={sx}>
                        {children}
                    </Stack>
                </>
            ) : (
                !isLoading &&
                titleNoLength && (
                    <Typography sx={styles.title}>{titleNoLength}</Typography>
                )
            )}
        </Box>
    );
};

export default InfinityList;
