import { Box, styled } from '@mui/material';

export const Page = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,

    width: '100%',
    height: `calc(100vh - ${theme.variables.layout.navbarHeight})`,
    position: 'relative',
    backgroundColor: theme.colors.secondary[50],
    overflow: 'hidden',
}));
