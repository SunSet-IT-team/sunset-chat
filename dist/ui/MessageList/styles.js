import { useTheme } from '@mui/material/styles';
export const useStyles = () => {
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
