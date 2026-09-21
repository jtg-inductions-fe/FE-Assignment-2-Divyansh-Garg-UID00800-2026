import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import { Navbar } from '@components/Navbar';

export const MainLayout = () => {
    return (
        <Box
            sx={(theme) => ({
                ...theme.mixins.flexCenterCol,
                height: '100%',
                width: '100%',
            })}
        >
            <Navbar />

            <Box
                component="main"
                sx={() => ({
                    flex: 1,
                    width: '100%',
                })}
            >
                <Outlet />
            </Box>
        </Box>
    );
};
