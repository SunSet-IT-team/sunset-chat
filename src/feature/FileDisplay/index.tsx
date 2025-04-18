import React, {useState, useEffect} from 'react';
import {Box, IconButton, Paper, Typography} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import {getFilePath} from '../../share/utils';

type FileDisplayProps = {
    fileUrl: string;
    isTemp?: boolean;
};

/**
 * Превью файла, который можно скачать
 */
const FileDisplay = ({fileUrl, isTemp}: FileDisplayProps) => {
    const [isImage, setIsImage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isTemp) {
            setIsLoading(false);
            return;
        }

        const checkIfImage = async () => {
            try {
                const response = await fetch(fileUrl, {method: 'HEAD'});

                const contentType = response.headers.get('Content-Type');
                setIsImage(
                    contentType ? contentType.startsWith('image/') : false
                );
            } catch (error) {
                console.error('Error checking file type:', error);
                setIsImage(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkIfImage();
    }, [fileUrl]);

    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = fileUrl;

        // Извлекаем имя файла из URL
        const fileName = fileUrl.split('/').pop() || 'download';
        link.download = fileName;

        // Программно кликаем по ссылке
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return <Box>Загрузка...</Box>;
    }

    // Для заглушек
    if (isTemp) {
        return (
            <Paper
                elevation={3}
                sx={{
                    width: 200,
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <InsertDriveFileIcon sx={{fontSize: 80, color: '#757575'}} />
                <Typography variant="caption" sx={{m: 1}}>
                    Загружаю...
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                width: 200,
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: isImage ? `url(${fileUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: isImage ? 'transparent' : '#f5f5f5',
            }}
        >
            {!isImage && (
                <>
                    <InsertDriveFileIcon
                        sx={{fontSize: 80, color: '#757575'}}
                    />
                    <Typography variant="caption" sx={{m: 1}}>
                        {fileUrl.split('/').pop()}
                    </Typography>
                </>
            )}
            <IconButton
                onClick={handleDownload}
                sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                    },
                }}
                aria-label="download"
            >
                <DownloadIcon />
            </IconButton>
        </Paper>
    );
};

export default FileDisplay;
