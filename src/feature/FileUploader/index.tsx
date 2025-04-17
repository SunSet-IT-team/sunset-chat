import React, {useState} from 'react';
import {
    LinearProgress,
    Box,
    Typography,
    Paper,
    Stack,
    IconButton,
} from '@mui/material';
import {InsertDriveFile, Close} from '@mui/icons-material';
import api from '../../api';
import {UploadFileDTO} from '../../api/dto';
import {useStyles} from './styles';

type FileUploaderProps = {
    /**
     * Ссылка на инпут
     */
    fileInputRef: React.RefObject<HTMLInputElement>;

    /**
     * Файл
     */
    file: File | null;

    /**
     * Обработчик для установки файла
     */
    setFile: (file: File | null) => void;

    /**
     * Колбек при начале загрузки
     */
    onStartUpload?: () => void;

    /**
     * Колбек при успешной загрузке
     */
    onSuccessUpload?: (ans: UploadFileDTO) => void;

    /**
     * Колбек при удалении файла
     */
    onDelete?: () => void;
};

/**
 * Загрузчик файлов
 */
const FileUploader = ({
    fileInputRef,
    onStartUpload,
    onSuccessUpload,
    onDelete,
    setFile,
    file,
}: FileUploaderProps) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const styles = useStyles();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            onStartUpload();
            handleUpload(event.target.files[0]);
        }
    };

    const handleUpload = async (file: File | null) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('files', file);

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const res = await api.post('/files/upload', formData, {
                headers: {'Content-Type': 'multipart/form-data'},

                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) /
                            (progressEvent.total || 1)
                    );
                    setUploadProgress(percentCompleted);
                },
            });

            onSuccessUpload(res.data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setUploadProgress(0);
        onDelete();
    };

    return (
        <Box sx={styles.box}>
            <Stack spacing={3}>
                <input
                    accept="*/*"
                    style={{display: 'none'}}
                    id="file-upload"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {file && (
                    <Box sx={styles.uploader}>
                        <Box display="flex" alignItems="center">
                            <Box display="flex" alignItems="center">
                                <InsertDriveFile color="primary" sx={{mr: 1}} />
                                <Typography variant="body1">
                                    {file.name}
                                </Typography>
                            </Box>
                            <IconButton onClick={handleRemoveFile} size="small">
                                <Close fontSize="small" />
                            </IconButton>
                        </Box>

                        {isUploading && (
                            <LinearProgress
                                variant="determinate"
                                value={uploadProgress}
                                sx={{mt: 2}}
                            />
                        )}
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

export default FileUploader;
