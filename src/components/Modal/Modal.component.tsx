import { PopoverActionButton, PopoverActions, PopoverContent, StyledPopover } from './Modal.styles';

import { Divider, Stack, Typography } from '@mui/material';

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
        <StyledPopover
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
                    <PopoverActionButton
                        title="Close Logout Modal"
                        variant="outlined"
                        color="inherit"
                        onClick={onClose}
                    >
                        {BtnOneLabel}
                    </PopoverActionButton>

                    <PopoverActionButton
                        title="Logout the User"
                        variant="contained"
                        color="error"
                        onClick={onConfirm}
                    >
                        {BtnTwoLabel}
                    </PopoverActionButton>
                </PopoverActions>
            </PopoverContent>
        </StyledPopover>
    );
};
