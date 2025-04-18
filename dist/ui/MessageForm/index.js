import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import { SendIcon } from '../icons/SendIcon';
import { useStyles } from './styles';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useChatMessagesUtils } from '../../model/useChatMessagesUtils';
import FileUploader from '../../feature/FileUploader';
/**
 * Форма отправки сообщения
 */
const MessageForm = ({ chat, socket }) => {
    const [message, setMessage] = useState('');
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [fileId, setFileId] = useState(''); // id который пришёл с сервера
    const { addNewMessage } = useChatMessagesUtils();
    const fileInputRef = useRef(null);
    const styles = useStyles();
    const disabled = (!message.trim() && !fileId) || isFileLoading;
    /**
     * Отправка сообщения
     */
    const handleSend = () => {
        if (disabled)
            return; // Не отправляем пустые сообщения и в момент загрузки файла
        const tempId = Date.now().toString(); // Используем timestamp как временный ID
        const newMessage = {
            id: tempId,
            tempId: tempId,
            chatId: chat.id,
            senderId: Number(chat.currentUserId),
            isLoading: true,
            isReaded: false,
            createdAt: new Date().toISOString(),
            text: message,
            files: fileId
                ? [
                    {
                        id: `${fileId}`,
                        mimetype: 'loader',
                        url: 'placeholder',
                    },
                ]
                : null,
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
    const handleKeyPress = (e) => {
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
    const handleSuccessUpload = (ans) => {
        setFileId(`${ans.data[0].id}`);
        setIsFileLoading(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(FileUploader, { fileInputRef: fileInputRef, onDelete: handleFileDelete, onStartUpload: handleStartUpload, onSuccessUpload: handleSuccessUpload, setFile: (file) => setFile(file), file: file }), _jsx(Box, { sx: {
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                }, children: _jsx(TextField, { multiline: true, maxRows: 3, minRows: 1, fullWidth: true, value: message, placeholder: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435...", sx: styles.messageArea, onChange: (e) => setMessage(e.target.value), onKeyDown: handleKeyPress, slotProps: {
                        input: {
                            startAdornment: (_jsx(InputAdornment, { position: "start", sx: { pl: 1 }, children: _jsx(IconButton, { edge: "start", onClick: handleAttach, sx: { p: 0 }, children: _jsx(AddCircleOutlineRoundedIcon, {}) }) })),
                            endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: handleSend, disabled: disabled, children: _jsx(SendIcon, {}) }) })),
                        },
                    } }) })] }));
};
export default MessageForm;
