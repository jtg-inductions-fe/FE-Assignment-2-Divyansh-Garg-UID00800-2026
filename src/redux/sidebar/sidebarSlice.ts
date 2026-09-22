import { createSlice } from '@reduxjs/toolkit';

import type { SidebarVisibility } from './sidebarTypes';

const initialState: SidebarVisibility = {
    isOpen: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.isOpen = true;
        },

        closeSidebar: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
