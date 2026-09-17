import { colors } from '@/theme/colors';
import { Box, styled } from '@mui/material';

export const Page = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    width: '100%',
    minHeight: `calc(100vh - ${theme.variables.layout.navbarHeight})`,
    position: 'relative',
    backgroundColor: colors.secondary[50],
    overflow: 'hidden',
}));
