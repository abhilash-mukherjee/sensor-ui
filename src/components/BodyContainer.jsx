import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import BodyHeader from './BodyHeader';
import WarehouseGrid from './WarehouseGrid';
import OverviewContainer from './OverviewContainer';
import InventoryTable from './Table';
import { useRecoilValue } from 'recoil';
import { isPluginActivatedState } from '../store/freshnessDataStateAtom';

export default function BodyContainer() {
    return (
        <Box
            bg="gray.200" // This is a light gray color; adjust the shade as needed
            p={4}        // Padding around the content
            color="black" // Text color
            minHeight="calc(100vh - 64px)" // Adjust based on your TopBar's height if different
        >
            <BodyHeader />
            <PluginBody />
            <TableContainer />
        </Box>
    );
}

function PluginBody() {
    const isPluginActive = useRecoilValue(isPluginActivatedState);
    return (
        <>
            <Flex width={'100%'} p={4}
                transition="transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
                transform={isPluginActive ? 'scale(1)' : 'scale(0)'}
                opacity={isPluginActive ? 1 : 0}>
                <OverviewContainer />
                <WarehouseGrid />
            </Flex>

        </>
    )
}

function TableContainer() {
    return (
        <>
            <Flex width={'100%'} p={4}>
                <InventoryTable />
            </Flex>
        </>
    )
}