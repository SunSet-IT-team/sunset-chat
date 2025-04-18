import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Box, Stack, Typography } from '@mui/material';
import { useStyles } from './styles';
import FileDisplay from '../../feature/FileDisplay';
import { useEffect } from 'react';
/**
 * Шаблон сообщения чата
 */
export const ChatMessage = ({ message, currentUserId, socket, }) => {
    const styles = useStyles();
    const isMyMessage = message.senderId == currentUserId;
    useEffect(() => {
        // Изменения статуса "прочитано"
        if (message.readed || isMyMessage || message.tempId == message.id)
            return;
        if (socket.current)
            socket.current.emit('markAsRead', {
                messageId: message.id,
                chatId: message.chatId,
            });
    }, [socket, socket.current]);
    return (_jsxs(Stack, { sx: isMyMessage ? styles.myMessage : styles.message, children: [_jsxs(Box, { sx: styles.messageContent, children: [message.content && (_jsx(Typography, { sx: styles.messageText, children: message.content })), message.fileUrl && (_jsx(FileDisplay, { fileUrl: message.fileUrl, isTemp: !!(message.tempId == message.id && message.fileUrl) }))] }), _jsxs(Stack, { sx: styles.messageAdditional, children: [_jsx(Typography, { sx: styles.messageTime, children: message.createdAt }), isMyMessage &&
                        (message.isLoading ? (_jsx(AccessTimeIcon, { fontSize: "small" })) : message.readed ? (_jsx(DoneAllRoundedIcon, { fontSize: "small" })) : (_jsx(DoneRoundedIcon, { fontSize: "small" })))] })] }));
};
