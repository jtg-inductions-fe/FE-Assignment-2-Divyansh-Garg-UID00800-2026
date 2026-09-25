import { Box, styled } from '@mui/material';

export const Bubble = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: theme.functions.pxToRem(384),
    height: theme.functions.pxToRem(384),
    borderRadius: '50%',
    background: theme.colors.primary[200],
    pointerEvents: 'none',
    filter: `blur(${theme.functions.pxToRem(20)})`,
}));

export default Bubble;
