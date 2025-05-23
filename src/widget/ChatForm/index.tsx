import { Box, Button, Stack, ThemeProvider } from '@mui/material';
import { useStyles } from './styles';
import ChatHeader from '../../ui/ChatHeader';
import MessageList from '../../ui/MessageList';
import { Chat } from '../../model/types';
import { chatTheme } from '../../theme';
import { useSocket } from '../../model/useSocket';
import MessageForm from '../../ui/MessageForm';
import { useChatMessagesUtils } from '../../model/useChatMessagesUtils';
import newMessageSound from '../../assets/sounds/new_message.mp3';

type ChatFormProps = {
    chat: Chat;
    handleCloseChat?: () => void;
};

export const ChatForm = ({ chat, handleCloseChat }: ChatFormProps) => {
    const { addNewMessage, readMessage } = useChatMessagesUtils();

    const onNewMessage = (msg: any) => {
        if (Number(msg.senderId) !== Number(chat.currentUserId)) {
            const audio = new Audio(newMessageSound);
            audio.play().catch((e) => {
                console.error('Не удалось воспроизвести звук:', e);
            });
        }
        addNewMessage(msg);
    };

    const onError = (msg: any) => {
        console.log(msg);
    };

    const onMessageRead = (msg: any) => {
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

    return (
        <ThemeProvider theme={chatTheme}>
            <Box sx={styles.form}>
                <ChatHeader chatUser={chat.chatUser} />

                <MessageList chat={chat} socket={socket} />

                <Stack sx={styles.messageForm}>
                    <MessageForm chat={chat} socket={socket} />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCloseChat}
                        sx={styles.btn}>
                        Закрыть чат
                    </Button>
                </Stack>
            </Box>
        </ThemeProvider>
    );
};
