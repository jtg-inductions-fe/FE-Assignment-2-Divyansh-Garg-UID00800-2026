import { StyledAppBar } from '@components/navigation/navbar.styles';
import { Stack, styled, Typography, type AppBarProps } from '@mui/material';
import { colors } from '@theme/colors';

export const AppBarHeader = (props: AppBarProps) => {
    return <StyledAppBar position="sticky" elevation={0} {...props} />;
};

export const Header = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    gap: theme.variables.spacing.sm,
    alignItems: 'start',
}));

export const Title = styled(Typography)(() => ({
    color: colors.secondary[900],
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.dark,
}));
