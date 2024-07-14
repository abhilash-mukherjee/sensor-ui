import { useRecoilValue } from "recoil";
import { sensorReadingState } from "../../store/freshnessDataStateAtom";
import { getLocationStatusFromSensorReading } from "../../helper/helpers";
import { Box, Grid, GridItem, Text, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex } from '@chakra-ui/react';

export function LocationDrawerContent({activeImmovableSpace}){
    const sensorReading = useRecoilValue(sensorReadingState);
    const locationStatus = getLocationStatusFromSensorReading(sensorReading);
    return(
        <>
         <div>Level: <b>{activeImmovableSpace}</b></div>
         <div>Sensor Reading: <b>{sensorReading}</b></div>
         <Text color={getColourForStatus(locationStatus)}>Freshness Status: <b color={getColourForStatus(locationStatus)}>{locationStatus}</b></Text>
         <HUTab1/>
         <HUTab2/>
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