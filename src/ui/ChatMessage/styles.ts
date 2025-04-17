import { useTheme } from '@mui/material/styles';
import { StylesDictionary } from '../../share/types';

export const useStyles = (): StylesDictionary => {
    const theme = useTheme();

    return {
        message: {
            p: '10px',
            maxWidth: '90%',
            borderRadius: '5px',
            mr: 'auto',
            ml: '',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.text.primary,
        },

        myMessage: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            p: '10px',
            maxWidth: '90%',
            borderRadius: '5px',
            ml: 'auto',
            mr: '',

            backgroundColor: theme.palette.primary.main,
            color: 'white',
        },

        messageContent: {
            fontSize: '14px',
            wordBreak: 'break-all',
            mb: 2,
        },
        messageTime: {
            fontSize: '10px',
        },
        messageAdditional: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            gap: '5px',
            alignItems: 'center',
            mt: '5px',
        },
    };
};
