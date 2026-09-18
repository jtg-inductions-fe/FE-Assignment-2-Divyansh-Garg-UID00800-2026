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
