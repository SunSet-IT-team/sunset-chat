import { useTheme } from '@mui/material/styles';
export const useStyles = () => {
    const theme = useTheme();
    return {
        chatHeader: {
            background: 'linear-gradient(to right, #3975CF, #3FBC14)',
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
            fontWeight: 500,
            fontSize: '21px',
            letterSpacing: '-0.05px',
            color: '#fff',
        },
        chatHeaderUserImage: {
            borderRadius: '50%',
            width: 89,
            height: 89,
            backgroundColor: '#fff',
            border: 'solid 2px #fff',
        },
    };
};
