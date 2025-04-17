import {useTheme} from '@mui/material/styles';
import {StylesDictionary} from '../../share/types';

export const useStyles = (): StylesDictionary => {
    const theme = useTheme();

    return {
        box: {
            backgroundColor: 'transparent',
            maxWidth: '90%',
        },
        uploader: {
            backgroundColor: 'transparent',
            mt: '0!important',
            m: 0,
            boxShadow: 'none',
        },
    };
};
