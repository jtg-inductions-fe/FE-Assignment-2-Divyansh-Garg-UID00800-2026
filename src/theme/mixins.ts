import { colors } from './colors';
import { variables } from './variables';

export const mixins = {
    pageContainer: {
        width: '100%',
        maxWidth: variables.layout.contentMaxWidth,
        margin: '0 auto',
        padding: variables.layout.pagePadding,
    },

    flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    flexCenterCol: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },

    flexBetween: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    card: {
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray[200]}`,
        borderRadius: variables.radius.lg,
        boxShadow: variables.shadows.card,
    },

    visuallyHidden: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        border: 0,
    },
} as const;
