import React from 'react';
import { UploadFileDTO } from '../../api/dto';
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
declare const FileUploader: ({ fileInputRef, onStartUpload, onSuccessUpload, onDelete, setFile, file, }: FileUploaderProps) => import("react/jsx-runtime").JSX.Element;
export default FileUploader;
