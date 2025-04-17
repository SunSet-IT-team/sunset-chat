import { useTheme } from '@mui/material/styles';
import { StylesDictionary } from '../../share/types';

export const useStyles = (): StylesDictionary => {
    const theme = useTheme();

    return {
        messageArea: {
            '& .MuiInputBase-input': {
                padding: '10px',
                '::placeholder': {
                    fontStyle: 'italic',
                    textAlign: 'center',
                    fontSize: '14px',
                },
            },
        },
    };
};
