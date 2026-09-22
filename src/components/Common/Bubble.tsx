import { Box, styled } from '@mui/material';
import { colors, pxToRem } from '@theme';

export const Bubble = styled(Box)(() => ({
    position: 'absolute',
    width: pxToRem(384),
    height: pxToRem(384),
    borderRadius: '50%',
    background: colors.primary[200],
    pointerEvents: 'none',
    filter: `blur(${pxToRem(20)})`,
}));

export default Bubble;
