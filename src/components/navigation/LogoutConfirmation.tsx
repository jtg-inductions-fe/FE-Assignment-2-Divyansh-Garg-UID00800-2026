import { Divider, Popover } from '@mui/material';

import { LogoutActionButton, LogoutActions, LogoutContent } from './navbar.styles';
import { Header, Title, Subtitle } from '@components/common/Header';

interface LogoutConfirmationProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutConfirmation = ({ anchorEl, onClose, onConfirm }: LogoutConfirmationProps) => {
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
            <LogoutContent>
                <Header>
                    <Title variant="h5">Logout</Title>

                    <Subtitle variant="body1">Are you sure you want to logout?</Subtitle>
                </Header>

                <Divider />

                <LogoutActions>
                    <LogoutActionButton variant="outlined" color="inherit" onClick={onClose}>
                        Cancel
                    </LogoutActionButton>

                    <LogoutActionButton variant="contained" color="error" onClick={onConfirm}>
                        Logout
                    </LogoutActionButton>
                </LogoutActions>
            </LogoutContent>
        </Popover>
    );
};
