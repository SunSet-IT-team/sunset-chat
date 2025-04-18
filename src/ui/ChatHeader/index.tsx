import {Avatar, Box, Stack, Typography} from '@mui/material';
import {ChatUser} from '../../model/types';
import {useStyles} from './styles';

type ChatHeaderProps = {
    chatUser: ChatUser;
};

/**
 * Шапка чата
 */
const ChatHeader = ({chatUser}: ChatHeaderProps) => {
    const styles = useStyles();

    return (
        <Box sx={styles.chatHeader}>
            <Stack sx={styles.chatHeaderUser}>
                <Avatar
                    src={chatUser.imagePath}
                    alt={chatUser.name}
                    sx={styles.chatHeaderUserImage}
                />
                <Typography sx={styles.chatHeaderUserName}>
                    {chatUser.name}
                </Typography>
            </Stack>
        </Box>
    );
};

export default ChatHeader;
