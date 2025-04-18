import {Stack, Typography} from '@mui/material';
import {useScrollObserver} from '../../model/useScrollObserver';
import {ChatMessage} from '../ChatMessage';
import {useStyles} from './styles';
import {Chat} from '../../model/types';
import {useChatMessages} from '../../model/useChatMessages';
import InfinityList from '../../feature/InfinityList';
import {useEffect, useState} from 'react';
import {Socket} from 'socket.io-client';

type MessageListProps = {
    chat: Chat;
    socket: React.RefObject<Socket>;
};

/**
 * Вывод списка сообщений
 */
const MessageList = ({chat, socket}: MessageListProps) => {
    const styles = useStyles();

    const {data, isLoading, ref, setCanLoad, isFirstPageLoaded} =
        useChatMessages(chat.id);

    const messages = data || [];

    console.log('data');
    console.log(data);
    console.log(isLoading);

    const {messageListRef} = useScrollObserver(
        messages,
        isFirstPageLoaded,
        setCanLoad
    );

    return (
        <Stack sx={styles.messageWrapper}>
            {chat.additionalInfo && (
                <Typography sx={styles.additionalInfo}>
                    {chat.additionalInfo}
                </Typography>
            )}

            <InfinityList
                sx={styles.messageList}
                listRef={messageListRef}
                observedRef={ref}
                isLoading={isLoading}
                titleNoLength="Сообщений пока нет..."
            >
                {[...messages].reverse().map((m) => (
                    <ChatMessage
                        key={m.id}
                        message={m}
                        socket={socket}
                        currentUserId={chat.currentUserId}
                    />
                ))}
            </InfinityList>
        </Stack>
    );
};

export default MessageList;
