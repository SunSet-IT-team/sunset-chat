import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
/**
 * Превью файла, который можно скачать
 */
const FileDisplay = ({ fileUrl, isTemp }) => {
    const [isImage, setIsImage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (isTemp) {
            setIsLoading(false);
            return;
        }
        const checkIfImage = async () => {
            try {
                const response = await fetch(fileUrl, { method: 'HEAD' });
                const contentType = response.headers.get('Content-Type');
                setIsImage(contentType ? contentType.startsWith('image/') : false);
            }
            catch (error) {
                console.error('Error checking file type:', error);
                setIsImage(false);
            }
            finally {
                setIsLoading(false);
            }
        };
        checkIfImage();
    }, [fileUrl]);
    const handleDownload = (e) => {
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
        return _jsx(Box, { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    // Для заглушек
    if (isTemp) {
        return (_jsxs(Paper, { elevation: 3, sx: {
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
            }, children: [_jsx(InsertDriveFileIcon, { sx: { fontSize: 80, color: '#757575' } }), _jsx(Typography, { variant: "caption", sx: { m: 1 }, children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u044E..." })] }));
    }
    return (_jsxs(Paper, { elevation: 3, sx: {
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
        }, children: [!isImage && (_jsxs(_Fragment, { children: [_jsx(InsertDriveFileIcon, { sx: { fontSize: 80, color: '#757575' } }), _jsx(Typography, { variant: "caption", sx: { m: 1 }, children: fileUrl.split('/').pop() })] })), _jsx(IconButton, { onClick: handleDownload, sx: {
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                    },
                }, "aria-label": "download", children: _jsx(DownloadIcon, {}) })] }));
};
export default FileDisplay;
