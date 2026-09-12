import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import Navbar from '@components/navigation/Navbar';

const MainLayout = () => {
    return (
        <Box
            sx={(theme) => ({
                ...theme.mixins.flexCenterCol,
                minHeight: '100vh',
            })}
        >
            <Navbar />

            <Box
                component="main"
                sx={() => ({
                    flex: 1,
                    width: '100vw',
                })}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
