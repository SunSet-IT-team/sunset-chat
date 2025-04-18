import { useTheme } from '@mui/material/styles';
export const useStyles = () => {
    const theme = useTheme();
    return {
        message: {
            p: '10px',
            maxWidth: '90%',
            borderRadius: '5px',
            mr: 'auto',
            ml: '',
            display: 'flex',
            textAlign: 'left',
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
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
        },
        messageText: {
            width: '100%',
            fontSize: '14px',
            wordBreak: 'break-all',
            whiteSpace: 'pre-line',
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
