import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Stack, Typography } from '@mui/material';
import { useStyles } from './styles';
import FileDisplay from '../FileDisplay';
/**
 * Шаблон сообщения чата
 */
export const ChatMessage = ({ senderId, content, createdAt, readed, isLoading, fileUrl, ...m }) => {
    const styles = useStyles();
    const isMyMessage = senderId == 4;
    return (_jsxs(Stack, { sx: isMyMessage ? styles.myMessage : styles.message, children: [content && (_jsx(Typography, { sx: styles.messageContent, children: content })), fileUrl && (_jsx(FileDisplay, { fileUrl: fileUrl, isTemp: !!(m.tempId == m.id && fileUrl) })), _jsxs(Stack, { sx: styles.messageAdditional, children: [_jsx(Typography, { sx: styles.messageTime, children: createdAt }), isMyMessage &&
                        (isLoading ? (_jsx(AccessTimeIcon, { fontSize: "small" })) : readed ? (_jsx(DoneAllRoundedIcon, { fontSize: "small" })) : (_jsx(DoneRoundedIcon, { fontSize: "small" })))] })] }));
};
