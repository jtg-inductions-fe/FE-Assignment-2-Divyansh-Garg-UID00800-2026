import { Avatar, Box, Stack, styled, Typography } from '@mui/material';

import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

export const ProfileCard = styled(Box)(({ theme }) => ({
    borderRadius: theme.variables.radius.xl,
    boxShadow: theme.variables.shadows.card,

    width: '100%',
    overflow: 'hidden',
    backgroundColor: colors.white,
    border: `1px solid ${colors.primary[100]}`,
}));

export const ProfileCardHeader = styled(Box)(({ theme }) => ({
    gap: theme.variables.spacing.xl,
    padding: theme.variables.spacing.xl,
    ...theme.mixins.flexBetween,

    width: '100%',
    background: `linear-gradient(
        135deg,
        ${colors.primary[50]} 0%,
        ${colors.white} 70%
    )`,

    borderBottom: `1px solid ${colors.primary[100]}`,

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',

        alignItems: 'stretch',
    },
}));

export const ProfileCardHeaderTop = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.lg,
    ...theme.mixins.flexBetween,
    flexDirection: 'row',

    minWidth: 0,
}));

export const AvatarContainer = styled(Box)(({ theme }) => ({
    borderRadius: theme.variables.radius.pill,

    width: pxToRem(112),
    height: pxToRem(112),
    flexShrink: 0,

    '& img': {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 'inherit',
        backgroundColor: colors.white,
    },
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    borderRadius: theme.variables.radius.pill,

    width: pxToRem(104),
    height: pxToRem(104),
    flexShrink: 0,
}));

export const ProfileCardTopHeaderInner = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.xs,
    alignItems: 'flex-start',

    minWidth: 0,

    [theme.breakpoints.down('md')]: {
        alignItems: 'flex-end',
    },
}));

export const ProfileName = styled(Typography)(({ theme }) => ({
    fontWeight: theme.variables.fontWeight.bold,

    color: colors.gray[900],
    wordBreak: 'break-word',
}));

export const ProfileUsername = styled(Typography)(({ theme }) => ({
    fontSize: theme.variables.fontSize.md,
    fontWeight: theme.variables.fontWeight.bold,
    paddingLeft: theme.variables.spacing.sm,
    paddingRight: theme.variables.spacing.sm,

    color: colors.primary[800],
}));

export const ProfileCardHeaderBottom = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.xs,
    padding: theme.variables.spacing.xs,
    borderRadius: theme.variables.radius.lg,

    flexDirection: 'row',
    backgroundColor: colors.primary[50],
    border: `1px solid ${colors.primary[100]}`,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

export const Count = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.xs,
    padding: theme.variables.spacing.md,
    borderRadius: theme.variables.radius.md,
    transition: theme.variables.transitions.normal,

    minWidth: pxToRem(100),

    '&:hover': {
        backgroundColor: colors.white,
    },

    [theme.breakpoints.down('sm')]: {
        padding: theme.variables.spacing.sm,

        flex: 1,
        minWidth: 0,
    },
}));

export const StatValue = styled(Typography)(({ theme }) => ({
    fontSize: theme.variables.fontSize.sm,
    fontWeight: theme.variables.fontWeight.bold,

    color: colors.primary[900],
}));

export const ProfileMain = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.xl,
    padding: theme.variables.spacing.xl,

    flexDirection: 'row',
    backgroundColor: colors.white,

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',

        alignItems: 'stretch',
    },
}));

export const ProfileMainTop = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.sm,

    alignItems: 'flex-start',
    minWidth: 0,
    flex: 1,
}));

export const Eyebrow = styled(Typography)(() => ({
    color: colors.gray[800],
    display: 'inline',
}));

export const Bio = styled(Typography)(() => ({
    color: colors.gray[900],
}));

export const AdditionalInfo = styled(Stack)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.variables.spacing.lg,
    padding: theme.variables.spacing.md,
    justifyContent: 'space-between',

    background: `linear-gradient(
        135deg,
        ${colors.primary[50]} 0%,
        ${colors.white} 70%
    )`,

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
    },
}));

export const GridEle = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
}));

export const GridEleText = styled(Typography)(({ theme }) => ({
    color: colors.gray[700],
    fontWeight: theme.variables.fontWeight.bold,
    padding: theme.variables.spacing.sm,
    backgroundColor: colors.gray[50],
    borderRadius: theme.variables.radius.pill,
}));
