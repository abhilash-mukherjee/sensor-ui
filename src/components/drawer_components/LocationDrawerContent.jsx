import { useRecoilValue } from "recoil";
import { sensorReadingState } from "../../store/freshnessDataStateAtom";
import { getLocationStatusFromSensorReading } from "../../helper/helpers";
import { Box, Text, Flex } from '@chakra-ui/react';
import { immovableSpace1State, immovableSpace2State } from "../../store/immovableSpaceDataAtoms";
import {SensorDataContainer } from '../drawer_components/SensorDataContainer'
const immovableSpace1Path = import.meta.env.VITE_IMMOVABLE_SPACE_1_PATH;
const immovableSpace2Path = import.meta.env.VITE_IMMOVABLE_SPACE_2_PATH;

export function LocationDrawerContent({activeImmovableSpacePath}){
    const sensorReading = useRecoilValue(sensorReadingState);
    const immovableSpace1 = useRecoilValue(immovableSpace1State);
    const immovableSpace2 = useRecoilValue(immovableSpace2State);
    const isDataAvailable = immovableSpace1.sensorData && immovableSpace2.sensorData;
    const locationStatus = getLocationStatusFromSensorReading(sensorReading);
    const sensorData = (activeImmovableSpacePath === immovableSpace1Path ? useRecoilValue(immovableSpace1State) : useRecoilValue(immovableSpace2State)).sensorData;
    return(
        <>
         <div>Level: <b>{activeImmovableSpacePath}</b></div>
         <div>Sensor Reading: <b>{sensorReading}</b></div>
         <Text color={getColourForStatus(locationStatus)}>Freshness Status: <b color={getColourForStatus(locationStatus)}>{locationStatus}</b></Text>
         <HUTab1/>
         <HUTab2/>
         {!isDataAvailable ? <Text>Loading Sensor Data...</Text> 
         : <SensorDataContainer sensorData={sensorData}/>
         }
        </>
    )
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

function getColourForStatus(status){
    if(status === 'RAW') return 'green.500'
    if(status === 'RIPE') return 'yellow.500'
    if(status === 'ROTTEN') return 'red.500'
    return 'white'
 }