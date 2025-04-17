import { useTheme } from '@mui/material/styles';
export const useStyles = () => {
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
