import { Message } from '../model/types';
import { MessageDTO } from './dto';
/**
 * Состыковывает MessageDTO с нашим нормальным DTO
 */
export declare const mapMessageDTO: (msg: MessageDTO) => Message;
