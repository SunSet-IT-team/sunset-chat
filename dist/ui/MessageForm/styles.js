import { useTheme } from '@mui/material/styles';
export const useStyles = () => {
    const theme = useTheme();
    return {
        messageArea: {
            '& textarea': {
                p: '0!important',
            },
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
