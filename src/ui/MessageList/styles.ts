import {useTheme} from '@mui/material/styles';
import {StylesDictionary} from '../../share/types';

export const useStyles = (): StylesDictionary => {
    const theme = useTheme();

    return {
        messageWrapper: {
            p: '20px',
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            overflow: 'hidden',
        },

        messageList: {
            gap: '12px',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            overflow: 'auto',
        },

        additionalInfo: {
            textAlign: 'center',
            mt: '10px',
        },
    };
};
