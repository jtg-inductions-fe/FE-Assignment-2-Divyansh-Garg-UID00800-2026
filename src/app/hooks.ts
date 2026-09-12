import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from './store';
import { useState, type MouseEvent } from 'react';

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useExpand = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    return { anchorEl, setAnchorEl, open, handleOpen, handleClose };
};
