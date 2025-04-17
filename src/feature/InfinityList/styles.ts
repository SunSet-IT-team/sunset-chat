import {keyframes, useTheme} from '@mui/material/styles';
import {StylesDictionary} from '../../share/types';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export const useStyles = (): StylesDictionary => {
    const theme = useTheme();

    return {
        title: {
            my: '20px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 500,
            color: theme.palette.primary.main,
        },
        loader: {
            mt: '12px',
            mx: 'auto',
            display: 'block',
            color: theme.palette.primary.main,
            animation: `${pulse} 2s ease-in-out infinite`,
        },

        box: {
            height: '100%',
            overflow: 'auto',
        },
    };
};
