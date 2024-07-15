import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getLocationStatus, getLocationStatusFromSensorReading } from '../helper/helpers';
import { ImmovableSpaceWithoutSensor } from './grid_components/ImmovableSpaceWithoutSensor';
import { ImmovableSpaceWithSensor } from './grid_components/ImmovableSpaceWithSensor';
import { ImmovableSpaceInfoDrawer } from './ImmovableSpaceInfoDrawer';
import { activeImmovableSpacePathState } from '../store/activeImmovableSpaceAtom';
import { immovableSpace1State, immovableSpace2State } from '../store/immovableSpaceDataAtoms';

const immovableSpace1Path = import.meta.env.VITE_IMMOVABLE_SPACE_1_PATH;
const immovableSpace2Path = import.meta.env.VITE_IMMOVABLE_SPACE_2_PATH;

const WarehouseGrid = () => {
    const immovableSpace1 = useRecoilValue(immovableSpace1State);
    const immovableSpace2 = useRecoilValue(immovableSpace2State);
    useEffect(() => {
        console.log("Component has been rendered");
    }, [immovableSpace1, immovableSpace2]);
    // Predefined array of colors for each cell, keeping the distribution of 12, 9, 3
    const colors = [
        'yellow.500', 'green.500', 'green.500', 'yellow.500', 'red.500', 'green.500',
        'green.500', 'green.500', 'green.500', 'green.500', 'green.500', 'green.500',
        'yellow.500', 'green.500', 'yellow.500', 'yellow.500', 'yellow.500', 'yellow.500',
        'yellow.500', 'green.500', 'yellow.500', 'red.500', 'red.500', 'green.500'
    ];

    const activeImmovableSpacePath = useRecoilValue(activeImmovableSpacePathState);
    const isOpen = activeImmovableSpacePath != null;

    const renderGridItems = () => {

        let items = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 1; col <= 8; col++) {
                const index = row * 8 + col - 1; // Calculate index for flat array access
                const imovableSpacePath = `${String.fromCharCode('A'.charCodeAt(0) + row)}${col}`;
                const isSensorPresent = imovableSpacePath === immovableSpace1Path || imovableSpacePath === immovableSpace2Path;
                const activeImmovableSpace = imovableSpacePath === immovableSpace1Path ?  immovableSpace1: immovableSpace2;
                const isDataAvailable = activeImmovableSpace.sensorData;
                const color = isSensorPresent && isDataAvailable? getLocationStatus(activeImmovableSpace).color : colors[index];
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
                        {isSensorPresent ? <ImmovableSpaceWithSensor imovableSpacePath={imovableSpacePath} immovableSpaceData={activeImmovableSpace}/> :
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
