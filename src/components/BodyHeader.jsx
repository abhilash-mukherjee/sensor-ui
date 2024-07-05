import React from 'react';
import { Box, Text, Tab, TabList, Tabs, Badge, Flex, IconButton } from '@chakra-ui/react';
import { SettingsIcon, DownloadIcon } from '@chakra-ui/icons';
import { MdOutlineDashboard } from "react-icons/md";
import Grid1Holder from './Grid1Holder';
import WarehouseGrid from './WarehouseGrid';
import { useRecoilState } from 'recoil';
import { isPluginActivatedState } from '../store/freshnessDataStateAtom';


const BodyHeader = () => {
    return (
        <Box p={4}>
            {/* <Text fontSize="xl" fontWeight="bold" mb={4}>INVENTORY</Text>
            <Tabs variant="enclosed">
                <TabList>
                    <Tab color={'black'}>In Warehouse</Tab>
                    <Tab color={'black'}>Missing</Tab>
                </TabList>
            </Tabs> */}
            <InventoryHeader />
        </Box>
    );
}


const InventoryHeader = () => {
    const [isPluginActivated, setIsPluginActivated] = useRecoilState(isPluginActivatedState);
    const handlePluginActivation = () => {
        setIsPluginActivated(!isPluginActivated);
    };
    return (
        <Flex
            align="center"
            justify="space-between"
            p={4}
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            marginTop={2}
        >
            <Box>
                <Text as="span" fontSize="lg" fontWeight="bold" mr={2}>In Warehouse Inventory</Text>
            </Box>
            <Box>
                <IconButton
                    aria-label="Settings"
                    icon={<SettingsIcon />}
                    size="sm"
                    mr={2}
                />
                <IconButton
                    aria-label="Dashboard"
                    onClick={handlePluginActivation}
                    icon={<MdOutlineDashboard height="100%" width="100%" />}
                    size="sm"
                    bg={isPluginActivated ? '#B8B6EB' : "gray.200"}
                    _hover={{
                        bg: isPluginActivated ? 'purple.300' : 'gray.200',
                    }}
                />
            </Box>
        </Flex>
    );
}


export default BodyHeader;
