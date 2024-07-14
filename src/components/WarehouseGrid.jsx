import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sensorReadingState } from '../store/freshnessDataStateAtom';
import { getLocationStatusFromSensorReading } from '../helper/helpers';
import { ImmovableSpaceWithoutSensor } from './grid_components/ImmovableSpaceWithoutSensor';
import { ImmovableSpaceWithSensor } from './grid_components/ImmovableSpaceWithSensor';
import { ImmovableSpaceInfoDrawer } from './ImmovableSpaceInfoDrawer';
import { activeImmovableSpaceState } from '../store/activeImmovableSpaceAtom';

const immovableSpace1Path = import.meta.env.VITE_IMMOVABLE_SPACE_1_PATH;
const immovableSpace2Path = import.meta.env.VITE_IMMOVABLE_SPACE_2_PATH;

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

    const activeImmovableSpace = useRecoilValue(activeImmovableSpaceState);
    const isOpen = activeImmovableSpace != null;

    const renderGridItems = () => {

        let items = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 1; col <= 8; col++) {
                const index = row * 8 + col - 1; // Calculate index for flat array access
                const imovableSpacePath = `${String.fromCharCode('A'.charCodeAt(0) + row)}${col}`;
                const isSensorPresent = imovableSpacePath === immovableSpace1Path || imovableSpacePath === immovableSpace2Path
                const color = isSensorPresent ? getColourForStatus(getLocationStatusFromSensorReading(sensorReading)):colors[index];
                items.push(
                    <GridItem
                        w="100%"
                        h="20"
                        bg={color}
                        borderRadius="md"
                        key={imovableSpacePath}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {isSensorPresent ? <ImmovableSpaceWithSensor imovableSpacePath={imovableSpacePath} /> :
                            <ImmovableSpaceWithoutSensor imovableSpacePath = {imovableSpacePath} />
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
                <ImmovableSpaceInfoDrawer />
            )}
        </Box>
    );
};

function getColourForStatus(status){
    if(status === 'RAW') return 'green.500'
    if(status === 'RIPE') return 'yellow.500'
    if(status === 'ROTTEN') return 'red.500'
    return 'white'
 }

export default WarehouseGrid;
