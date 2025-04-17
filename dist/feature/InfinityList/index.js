import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, CircularProgress, Stack, Typography, } from '@mui/material';
import { useStyles } from './styles';
/**
 * Отображение списка, который можно прокручивать
 */
const InfinityList = ({ children, isLoading, titleNoLength, observedRef, listRef, sx, }) => {
    const styles = useStyles();
    return (_jsx(Box, { sx: styles.box, ref: listRef, children: children && children.length ? (_jsxs(_Fragment, { children: [observedRef !== undefined && _jsx(Box, { ref: observedRef }), isLoading && (_jsx(CircularProgress, { size: 64, thickness: 4, sx: styles.loader })), _jsx(Stack, { direction: 'column', gap: '12px', sx: sx, children: children })] })) : (!isLoading &&
            titleNoLength && (_jsx(Typography, { sx: styles.title, children: titleNoLength }))) }));
};
export default InfinityList;
