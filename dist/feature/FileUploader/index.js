import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { LinearProgress, Box, Typography, Stack, IconButton } from '@mui/material';
import { InsertDriveFile, Close } from '@mui/icons-material';
import api from '../../api';
import { useStyles } from './styles';
import { toast } from 'react-toastify';
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 МБ
/**
 * Загрузчик файлов
 */
const FileUploader = ({ fileInputRef, onStartUpload, onSuccessUpload, onDelete, setFile, file, }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const styles = useStyles();
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
                toast.error(`Файл слишком большой. Максимальный размер: ${MAX_FILE_SIZE_BYTES / (1024 * 1024)} МБ`);
                return;
            }
            setFile(selectedFile);
            if (onStartUpload)
                onStartUpload();
            handleUpload(selectedFile);
        }
    };
    const handleUpload = async (file) => {
        if (!file)
            return;
        const formData = new FormData();
        formData.append('files', file);
        setIsUploading(true);
        setUploadProgress(0);
        try {
            const res = await api.post('/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setUploadProgress(percentCompleted);
                },
            });
            if (onSuccessUpload)
                onSuccessUpload(res.data);
        }
        catch (error) {
            console.error('Ошибка загрузки:', error);
        }
        finally {
            setIsUploading(false);
        }
    };
    const handleRemoveFile = () => {
        setFile(null);
        setUploadProgress(0);
        if (onDelete)
            onDelete();
    };
    return (_jsx(Box, { sx: styles.box, children: _jsxs(Stack, { spacing: 3, children: [_jsx("input", { accept: "*/*", style: { display: 'none' }, id: "file-upload", type: "file", ref: fileInputRef, onChange: handleFileChange }), file && (_jsxs(Box, { sx: styles.uploader, children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(InsertDriveFile, { color: "primary", sx: { mr: 1 } }), _jsx(Typography, { variant: "body1", children: file.name })] }), _jsx(IconButton, { onClick: handleRemoveFile, size: "small", children: _jsx(Close, { fontSize: "small" }) })] }), isUploading && (_jsx(LinearProgress, { variant: "determinate", value: uploadProgress, sx: { mt: 2 } }))] }))] }) }));
};
export default FileUploader;
