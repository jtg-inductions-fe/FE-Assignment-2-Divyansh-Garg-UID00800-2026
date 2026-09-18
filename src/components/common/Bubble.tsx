import { Box } from '@mui/material';
import type { SxProps } from '@mui/material';
import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

// for customization
interface BubbleProps {
    sx?: SxProps;
}

const Bubble = ({ sx }: BubbleProps) => {
    return (
        <Box
            sx={[
                {
                    position: 'absolute',
                    width: pxToRem(384),
                    height: pxToRem(384),
                    borderRadius: '50%',
                    background: colors.primary[200],
                    pointerEvents: 'none',
                    filter: `blur(${pxToRem(20)})`,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        />
    );
};

export default Bubble;
