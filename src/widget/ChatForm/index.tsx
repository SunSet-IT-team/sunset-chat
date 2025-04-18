import {Box, Button, Stack, ThemeProvider} from '@mui/material';
import {useStyles} from './styles';
import ChatHeader from '../../ui/ChatHeader';
import MessageList from '../../ui/MessageList';
import {Chat} from '../../model/types';
import {chatTheme} from '../../theme';
import {useSocket} from '../../model/useSocket';
import MessageForm from '../../ui/MessageForm';
import {useChatMessagesUtils} from '../../model/useChatMessagesUtils';

type ChatFormProps = {
    chat: Chat;
    handleCloseChat?: () => void;
};

export const ChatForm = ({chat, handleCloseChat}: ChatFormProps) => {
    const {addNewMessage, readMessage} = useChatMessagesUtils();

    const onNewMessage = (msg: any) => {
        console.log(msg);

        addNewMessage(msg);
    };

    const onError = (msg: any) => {
        console.log(msg);
    };

    const onMessageRead = (msg: any) => {
        console.log('Прочитано сообщение');

        readMessage(msg);
    };

    const {socket} = useSocket({
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
                    >
                        Закрыть чат
                    </Button>
                </Stack>
            </Box>
        </ThemeProvider>
    );
};
