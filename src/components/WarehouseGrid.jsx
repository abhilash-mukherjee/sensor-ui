import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Text, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { sensorReadingState } from '../store/freshnessDataStateAtom';
import { getLocationStatusFromSensorReading } from '../helper/helpers';

const WarehouseGrid = () => {
    const sensorReading= useRecoilValue(sensorReadingState);
    useEffect(() => {
        console.log("Component has been rendered");
    }, [sensorReading]);
    // Predefined array of colors for each cell, keeping the distribution of 12, 9, 3
    const colors = [
        'yellow.500', 'green.500', 'green.500', 'yellow.500', 'red.500', 'green.500',
        'green.500', 'green.500', 'green.500', 'green.500', 'green.500', 'green.500',
        'yellow.500', 'green.500', 'yellow.500', 'yellow.500', 'yellow.500', 'yellow.500',
        'yellow.500', 'green.500', 'yellow.500', 'red.500', 'red.500', 'green.500'
    ];

    const [activeLabel, setActiveLabel] = useState(null);
    const isOpen = activeLabel != null;
    const onClose = () => setActiveLabel(null);

    const renderGridItems = () => {

        let items = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 1; col <= 8; col++) {
                const index = row * 8 + col - 1; // Calculate index for flat array access
                const label = `${String.fromCharCode('A'.charCodeAt(0) + row)}${col}`;
                const isBtn = label === 'A3'
                const color = isBtn ? getColourForStatus(getLocationStatusFromSensorReading(sensorReading)):colors[index];
                items.push(
                    <GridItem
                        w="100%"
                        h="20"
                        bg={color}
                        borderRadius="md"
                        key={label}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {isBtn ? <Button
                            onClick={() => setActiveLabel(label)}
                            variant="ghost"
                            backgroundColor="transparent"
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                            cursor={'pointer'}
                            width={'100%'}
                            height={'100%'}
                        >
                            {label}
                        </Button> :
                            <Button
                            onClick={() => alert("No sensor installed corresponding to this location")}
                            variant="ghost"
                            backgroundColor="transparent"
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                            cursor={'default'}
                            width={'100%'}
                            height={'100%'}
                        >
                            {label}
                        </Button>
                        }
                    </GridItem>
                );
            }
        }
        return items;
    };

    return (
        <Box p={5} borderWidth="1px" borderRadius="lg" flex={1} bgColor='gray.50'>
            {/* <Text fontSize="lg" fontWeight="bold" mb={2}>Aisle A - Zone A</Text> */}
            <Grid templateColumns="repeat(8, 1fr)" gap={2}>
                {renderGridItems()}
            </Grid>
            {isOpen && (
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    size={'md'}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Level Details</DrawerHeader>
                        <DrawerBody>
                            <LocationDrawerContent activeLabel={activeLabel}/>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                            <Button colorScheme='blue' onClick={onClose}>Close</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </Box>
    );
};

function LocationDrawerContent({activeLabel}){
    const sensorReading = useRecoilValue(sensorReadingState);
    const locationStatus = getLocationStatusFromSensorReading(sensorReading);
    return(
        <>
         <div>Level: <b>{activeLabel}</b></div>
         <div>Sensor Reading: <b>{sensorReading}</b></div>
         <Text color={getColourForStatus(locationStatus)}>Freshness Status: <b color={getColourForStatus(locationStatus)}>{locationStatus}</b></Text>
         <HUTab1/>
         <HUTab2/>
        </>
    )
}

function getColourForStatus(status){
    if(status === 'RAW') return 'green.500'
    if(status === 'RIPE') return 'yellow.500'
    if(status === 'ROTTEN') return 'red.500'
    return 'white'
 }

function HUTab1(){
    return(
        <>
        <Box
        bg={'gray.100'}
        borderRadius="md"
        paddingInline={4}
        marginTop={4}
        paddingBlock={2}>
            <Flex justifyContent={'space-between'}>
                <Text>HU ID: <b>P231</b></Text>
                <Text>Item: <b>Banana</b></Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
                <Text>SKU ID: <b>S92020398</b></Text>
                <Text>Vendor: <b>Vendor1</b></Text>
            </Flex>
        </Box>
        </>
    )
}

function HUTab2(){
    return(
        <>
        <Box
        bg={'gray.100'}
        borderRadius="md"
        paddingInline={4}
        marginTop={4}
        paddingBlock={2}>
            <Flex justifyContent={'space-between'}>
                <Text>HU ID: <b>C351</b></Text>
                <Text>Item: <b>Banana</b></Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
                <Text>SKU ID: <b>S72520393</b></Text>
                <Text>Vendor: <b>Vendor2</b></Text>
            </Flex>
        </Box>
        </>
    )
}

export default WarehouseGrid;
