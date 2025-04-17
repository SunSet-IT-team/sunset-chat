import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import {Stack, Typography} from '@mui/material';
import {Message} from '../../model/types';
import {useStyles} from './styles';
import FileDisplay from '../FileDisplay';

type ChatMessageProps = Message;

/**
 * Шаблон сообщения чата
 */
export const ChatMessage = ({
    senderId,
    content,
    createdAt,
    readed,
    isLoading,
    fileUrl,
    ...m
}: ChatMessageProps) => {
    const styles = useStyles();

    const isMyMessage = senderId == 4;

    return (
        <Stack sx={isMyMessage ? styles.myMessage : styles.message}>
            {content && (
                <Typography sx={styles.messageContent}>{content}</Typography>
            )}
            {fileUrl && (
                <FileDisplay
                    fileUrl={fileUrl}
                    isTemp={!!(m.tempId == m.id && fileUrl)}
                />
            )}
            <Stack sx={styles.messageAdditional}>
                <Typography sx={styles.messageTime}>{createdAt}</Typography>
                {isMyMessage &&
                    (isLoading ? (
                        <AccessTimeIcon fontSize="small" />
                    ) : readed ? (
                        <DoneAllRoundedIcon fontSize="small" />
                    ) : (
                        <DoneRoundedIcon fontSize="small" />
                    ))}
            </Stack>
        </Stack>
    );
};
