import '@mui/material/styles';
import { mixins } from './mixins';

declare module '@mui/material/styles' {
    interface Theme {
        variables: {
            layout: {
                navbarHeight: string;
                contentMaxWidth: string;
                pagePadding: string;
                sectionGap: string;
                logoutMenuWidth: string;
            };

            radius: {
                xs: string;
                sm: string;
                md: string;
                lg: string;
                xl: string;
                pill: string;
            };

            shadows: {
                card: string;
            };

            spacing: {
                xs: string;
                sm: string;
                md: string;
                lg: string;
                xl: string;
                xxl: string;
            };

            fontWeight: {
                regular: number;
                medium: number;
                semiBold: number;
                bold: number;
                extraBold: number;
            };

            lineHeight: {
                sm: number;
                md: number;
                lg: number;
                xl: number;
                xxl: number;
            };

            iconSize: {
                sm: string;
                md: string;
                lg: string;
                xl: string;
                xxl: string;
            };

            fontSize: {
                xs: string;
                sm: string;
                md: string;
                lg: string;
            };

            transitions: {
                slow: string;
                normal: string;
                fast: string;
            };
        };

        colors: {
            primary: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                500: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };

            secondary: {
                50: string;
                100: string;
                200: string;
                300: string;
                400: string;
                500: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };

            gray: {
                50: string;
                100: string;
                200: string;
                300: string;
                600: string;
                900: string;
            };

            success: {
                100: string;
                600: string;
                800: string;
            };

            warning: {
                100: string;
                600: string;
                800: string;
            };

            error: {
                100: string;
                200: string;
                500: string;
                600: string;
                800: string;
            };

            info: {
                100: string;
                600: string;
                800: string;
            };

            white: string;
            black: string;
        };

        functions: {
            pxToRem: (number) => string;
        };
    }

    interface ThemeOptions {
        variables?: {
            layout?: {
                navbarHeight?: string;
                contentMaxWidth?: string;
                pagePadding?: string;
                sectionGap?: string;
                logoutMenuWidth?: string;
            };

            radius?: {
                xs?: string;
                sm?: string;
                md?: string;
                lg?: string;
                xl?: string;
                pill?: string;
            };

            shadows?: {
                card?: string;
            };

            spacing?: {
                xs?: string;
                sm?: string;
                md?: string;
                lg?: string;
                xl?: string;
                xxl?: string;
            };

            fontWeight?: {
                regular?: number;
                medium?: number;
                semiBold?: number;
                bold?: number;
                extraBold?: number;
            };

            lineHeight?: {
                sm?: number;
                md?: number;
                lg?: number;
                xl?: number;
                xxl?: number;
            };

            iconSize?: {
                sm?: string;
                md?: string;
                lg?: string;
                xl?: string;
                xxl?: string;
            };

            fontSize?: {
                xs?: string;
                sm?: string;
                md?: string;
                lg?: string;
            };

            transitions?: {
                slow?: string;
                normal?: string;
                fast?: string;
            };
        };

        colors?: {
            primary?: {
                50?: string;
                100?: string;
                200?: string;
                300?: string;
                400?: string;
                500?: string;
                600?: string;
                700?: string;
                800?: string;
                900?: string;
            };

            secondary?: {
                50?: string;
                100?: string;
                200?: string;
                300?: string;
                400?: string;
                500?: string;
                600?: string;
                700?: string;
                800?: string;
                900?: string;
            };

            gray?: {
                50?: string;
                100?: string;
                200?: string;
                300?: string;
                600?: string;
                900?: string;
            };

            success?: {
                100?: string;
                600?: string;
                800?: string;
            };

            warning?: {
                100?: string;
                600?: string;
                800?: string;
            };

            error?: {
                100?: string;
                200?: string;
                500?: string;
                600?: string;
                800?: string;
            };

            info?: {
                100?: string;
                600?: string;
                800?: string;
            };

            white?: string;
            black?: string;
        };

        functions?: {
            pxToRem?: (number) => string;
        };
    }

    interface Mixins {
        pageContainer: typeof mixins.pageContainer;
        flexCenter: typeof mixins.flexCenter;
        flexCenterCol: typeof mixins.flexCenterCol;
        flexBetween: typeof mixins.flexBetween;
        card: typeof mixins.card;
        visuallyHidden: typeof mixins.visuallyHidden;
    }
}
