const BASE_FONT_SIZE = 16;

export const functions = {
    pxToRem: (px: number): string => {
        return `${px / BASE_FONT_SIZE}rem`;
    },
};
