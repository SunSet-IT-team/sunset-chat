import { useTheme } from '@mui/material/styles';
import { StylesDictionary } from '../../share/types';

export const useStyles = (): StylesDictionary => {
    const theme = useTheme();

    return {
        chatHeader: {
            backgroundColor: theme.palette.primary.light,
            position: 'sticky',
            left: 0,
            top: 0,
            right: 0,
        },

        chatHeaderUser: {
            justifyContent: 'center',
            alignItems: 'center',
            py: '15px',
        },

        chatHeaderUserName: {
            textAlign: 'center',
            mt: '10px',
        },

        chatHeaderUserImage: {
            borderRadius: '50%',
            width: 89,
            height: 89,
            backgroundColor: '#4D4D4D',
        },
    };
};
