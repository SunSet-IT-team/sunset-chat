import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useStyles } from './styles';
/**
 * Шапка чата
 */
const ChatHeader = ({ chatUser }) => {
    const styles = useStyles();
    return (_jsx(Box, { sx: styles.chatHeader, children: _jsxs(Stack, { sx: styles.chatHeaderUser, children: [_jsx(Avatar, { src: chatUser.imagePath, alt: chatUser.name, sx: styles.chatHeaderUserImage }), _jsx(Typography, { sx: styles.chatHeaderUserName, children: chatUser.name })] }) }));
};
export default ChatHeader;
