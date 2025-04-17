import { useTheme } from '@mui/material/styles';
import { StylesDictionary } from '../../share/types';

export const useStyles = (): StylesDictionary => {
    const theme = useTheme();

    return {
        form: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: 'solid 2px',
            borderColor: theme.palette.primary.light,
            borderRadius: 4,
            overflow: 'hidden',
        },
        messageForm: {
            gap: '10px',
            px: '20px',
            pb: '20px',
        },
    };
};
