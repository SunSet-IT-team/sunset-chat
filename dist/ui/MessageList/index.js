import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, Typography } from '@mui/material';
import { useScrollObserver } from '../../model/useScrollObserver';
import { ChatMessage } from '../ChatMessage';
import { useStyles } from './styles';
import { useChatMessages } from '../../model/useChatMessages';
import InfinityList from '../../feature/InfinityList';
import { useEffect } from 'react';
/**
 * Вывод списка сообщений
 */
const MessageList = ({ chat, socket }) => {
    const styles = useStyles();
    const { data, isLoading, ref, setCanLoad } = useChatMessages(chat.id);
    const messages = data || [];
    const { messageListRef, isInited } = useScrollObserver(messages);
    useEffect(() => {
        // Костыль для первой загрузки
        setCanLoad(isInited);
    }, [isInited, setCanLoad]);
    return (_jsxs(Stack, { sx: styles.messageWrapper, children: [chat.additionalInfo && (_jsx(Typography, { sx: styles.additionalInfo, children: chat.additionalInfo })), _jsx(InfinityList, { sx: styles.messageList, listRef: messageListRef, observedRef: ref, isLoading: isLoading, titleNoLength: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442...", children: messages.reverse().map((m) => (_jsx(ChatMessage, { message: m, socket: socket, currentUserId: chat.currentUserId }, m.id))) })] }));
};
export default MessageList;
