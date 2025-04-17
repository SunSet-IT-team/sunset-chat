import {Box, TextField, InputAdornment, IconButton} from '@mui/material';
import {useRef, useState} from 'react';
import {SendIcon} from '../icons/SendIcon';
import {useStyles} from './styles';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {Chat} from '../../model/types';
import {Socket} from 'socket.io-client';
import {useChatMessagesUtils} from '../../model/useChatMessagesUtils';
import {MessageDTO, UploadFileDTO} from '../../api/dto';
import FileUploader from '../../feature/FileUploader';

type MessageFormProps = {
    chat: Chat;
    socket: React.RefObject<Socket>;
};

/**
 * Форма отправки сообщения
 */
const MessageForm = ({chat, socket}: MessageFormProps) => {
    const [message, setMessage] = useState<string>('');
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileId, setFileId] = useState(''); // id который пришёл с сервера
    const {addNewMessage} = useChatMessagesUtils();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const styles = useStyles();

    const disabled = (!message.trim() && !fileId) || isFileLoading;

    /**
     * Отправка сообщения
     */
    const handleSend = () => {
        if (disabled) return; // Не отправляем пустые сообщения и в момент загрузки файла

        const tempId = Date.now().toString(); // Используем timestamp как временный ID
        const newMessage: MessageDTO = {
            id: tempId,
            tempId: tempId,
            chatId: chat.id,
            senderId: 4,
            isLoading: true,
            isReaded: false,
            createdAt: new Date().toISOString(),
            text: message,
            files: [
                {
                    id: `${fileId}`,
                    mimetype: 'loader',
                    url: 'placeholder',
                },
            ],
            isMine: false,
        };

        addNewMessage(newMessage);

        socket.current &&
            socket.current.emit('sendMessage', {
                chatId: newMessage.chatId,
                text: newMessage.text,
                tempId: newMessage.tempId,
                fileIds: fileId ? [parseInt(fileId)] : [],
            });

        setFile(null);
        setFileId('');
        setMessage('');
    };

    /**
     * Прикрепление файлов
     */
    const handleAttach = () => {
        fileInputRef.current?.click();
    };

    /**
     * Удобная отправка формы через enter
     */
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    /**
     * При откреплении файла
     */
    const handleFileDelete = () => {
        setFileId('');
        setIsFileLoading(false);
    };

    /**
     * При начале загрузки
     */
    const handleStartUpload = () => {
        setIsFileLoading(true);
    };

    /**
     * При успешной загрузке
     */
    const handleSuccessUpload = (ans: UploadFileDTO) => {
        setFileId(`${ans.data[0].id}`);
        setIsFileLoading(false);
    };

    return (
        <>
            <FileUploader
                fileInputRef={fileInputRef}
                onDelete={handleFileDelete}
                onStartUpload={handleStartUpload}
                onSuccessUpload={handleSuccessUpload}
                setFile={(file) => setFile(file)}
                file={file}
            />

            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    value={message}
                    placeholder="Написать сообщение..."
                    sx={styles.messageArea}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={handleKeyPress}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start" sx={{pl: 1}}>
                                    <IconButton
                                        edge="start"
                                        onClick={handleAttach}
                                        sx={{p: 0}}
                                    >
                                        <AddCircleOutlineRoundedIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleSend}
                                        loading={isFileLoading}
                                        disabled={disabled}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>
        </>
    );
};

export default MessageForm;
