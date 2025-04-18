import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Stack, ThemeProvider } from '@mui/material';
import { useStyles } from './styles';
import ChatHeader from '../../ui/ChatHeader';
import MessageList from '../../ui/MessageList';
import { chatTheme } from '../../theme';
import { useSocket } from '../../model/useSocket';
import MessageForm from '../../ui/MessageForm';
import { useChatMessagesUtils } from '../../model/useChatMessagesUtils';
import newMessageSound from '../../assets/sounds/new_message.mp3';
export const ChatForm = ({ chat, handleCloseChat }) => {
    const { addNewMessage, readMessage } = useChatMessagesUtils();
    const onNewMessage = (msg) => {
        if (msg.senderId !== chat.currentUserId) {
            const audio = new Audio(newMessageSound);
            audio.play().catch((e) => {
                console.error('Не удалось воспроизвести звук:', e);
            });
        }
        addNewMessage(msg);
    };
    const onError = (msg) => {
        console.log(msg);
    };
    const onMessageRead = (msg) => {
        readMessage(msg);
    };
    const { socket } = useSocket({
        chatId: chat.id,
        events: {
            onNewMessage,
            onError,
            onMessageRead,
        },
    });
    const styles = useStyles();
    return (_jsx(ThemeProvider, { theme: chatTheme, children: _jsxs(Box, { sx: styles.form, children: [_jsx(ChatHeader, { chatUser: chat.chatUser }), _jsx(MessageList, { chat: chat, socket: socket }), _jsxs(Stack, { sx: styles.messageForm, children: [_jsx(MessageForm, { chat: chat, socket: socket }), _jsx(Button, { variant: "contained", color: "primary", fullWidth: true, onClick: handleCloseChat, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0447\u0430\u0442" })] })] }) }));
};
