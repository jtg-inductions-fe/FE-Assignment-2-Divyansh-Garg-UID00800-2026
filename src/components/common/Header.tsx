import { colors } from '@/theme/colors';
import { styled, Typography } from '@mui/material';

export const Title = styled(Typography)(() => ({
    color: colors.primary[900],
}));

export const Subtitle = styled(Typography)(() => ({
    color: colors.primary[700],
}));
