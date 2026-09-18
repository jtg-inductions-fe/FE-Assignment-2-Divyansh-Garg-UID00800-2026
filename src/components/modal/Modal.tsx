import {
    PopoverActionButton,
    PopoverActions,
    PopoverContent,
} from '@components/modal/modal.styles';
import { Divider, Popover, Stack, Typography } from '@mui/material';

interface ModalProps {
    title: string;
    description: string;
    BtnOneLabel: string;
    BtnTwoLabel: string;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const Modal = ({
    title,
    description,
    BtnOneLabel,
    BtnTwoLabel,
    anchorEl,
    onClose,
    onConfirm,
}: ModalProps) => {
    const open = Boolean(anchorEl);

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}

            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <PopoverContent>
                <Stack>
                    <Typography variant="h5">{title}</Typography>

                    <Typography variant="body1">{description}</Typography>
                </Stack>

                <Divider />

                <PopoverActions>
                    <PopoverActionButton variant="outlined" color="inherit" onClick={onClose}>
                        {BtnOneLabel}
                    </PopoverActionButton>

                    <PopoverActionButton variant="contained" color="error" onClick={onConfirm}>
                        {BtnTwoLabel}
                    </PopoverActionButton>
                </PopoverActions>
            </PopoverContent>
        </Popover>
    );
};
