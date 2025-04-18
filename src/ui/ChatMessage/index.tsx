import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import {Box, Stack, Typography} from '@mui/material';
import {Message} from '../../model/types';
import {useStyles} from './styles';
import FileDisplay from '../../feature/FileDisplay';
import {useEffect} from 'react';
import {Socket} from 'socket.io-client';

type ChatMessageProps = {
    message: Message;
    currentUserId: string | number;
    socket: React.RefObject<Socket>;
};

/**
 * Шаблон сообщения чата
 */
export const ChatMessage = ({
    message,
    currentUserId,
    socket,
}: ChatMessageProps) => {
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

    return (
        <Stack sx={isMyMessage ? styles.myMessage : styles.message}>
            <Box sx={styles.messageContent}>
                {message.content && (
                    <Typography sx={styles.messageText}>
                        {message.content}
                    </Typography>
                )}
                {message.fileUrl && (
                    <FileDisplay
                        fileUrl={message.fileUrl}
                        isTemp={
                            !!(message.tempId == message.id && message.fileUrl)
                        }
                    />
                )}
            </Box>
            <Stack sx={styles.messageAdditional}>
                <Typography sx={styles.messageTime}>
                    {message.createdAt}
                </Typography>
                {isMyMessage &&
                    (message.isLoading ? (
                        <AccessTimeIcon fontSize="small" />
                    ) : message.readed ? (
                        <DoneAllRoundedIcon fontSize="small" />
                    ) : (
                        <DoneRoundedIcon fontSize="small" />
                    ))}
            </Stack>
        </Stack>
    );
};
