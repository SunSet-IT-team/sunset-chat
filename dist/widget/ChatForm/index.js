import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Stack, ThemeProvider } from '@mui/material';
import { useStyles } from './styles';
import ChatHeader from '../../ui/ChatHeader';
import MessageList from '../../ui/MessageList';
import { chatTheme } from '../../theme';
import { useSocket } from '../../model/useSocket';
import MessageForm from '../../ui/MessageForm';
import { useChatMessagesUtils } from '../../model/useChatMessagesUtils';
export const ChatForm = ({ chat, handleCloseChat }) => {
    const { addNewMessage } = useChatMessagesUtils();
    const onNewMessage = (msg) => {
        addNewMessage(msg);
    };
    const onError = (msg) => {
        console.log(msg);
    };
    const { socket } = useSocket({
        chatId: chat.id,
        events: {
            onNewMessage,
            onError,
        },
    });
    const styles = useStyles();
    return (_jsx(ThemeProvider, { theme: chatTheme, children: _jsxs(Box, { sx: styles.form, children: [_jsx(ChatHeader, { chatUser: chat.chatUser }), _jsx(MessageList, { chat: chat }), _jsxs(Stack, { sx: styles.messageForm, children: [_jsx(MessageForm, { chat: chat, socket: socket }), _jsx(Button, { variant: "contained", color: "primary", fullWidth: true, onClick: handleCloseChat, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0447\u0430\u0442" })] })] }) }));
};
