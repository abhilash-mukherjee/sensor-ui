import React from 'react';
import { Box } from '@chakra-ui/react';
import BodyHeader from './BodyHeader';
import WarehouseGrid from './WarehouseGrid';
import OverviewContainer from './OverviewContainer';

export default function BodyContainer() {
    return (
        <Box
            bg="gray.100" // This is a light gray color; adjust the shade as needed
            p={4}        // Padding around the content
            color="black" // Text color
            minHeight="calc(100vh - 64px)" // Adjust based on your TopBar's height if different
        >
            <BodyHeader />
            <OverviewContainer />
            <WarehouseGrid />
        </Box>
    );
}
