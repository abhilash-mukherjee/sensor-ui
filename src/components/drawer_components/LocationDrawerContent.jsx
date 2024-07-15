import { useRecoilValue } from "recoil";
import { sensorReadingState } from "../../store/freshnessDataStateAtom";
import { getLocationStatus, getLocationStatusFromSensorReading } from "../../helper/helpers";
import { Box, Text, Flex } from '@chakra-ui/react';
import { immovableSpace1State, immovableSpace2State } from "../../store/immovableSpaceDataAtoms";
import { SensorDataContainer } from '../drawer_components/SensorDataContainer'
const immovableSpace1Path = import.meta.env.VITE_IMMOVABLE_SPACE_1_PATH;
const immovableSpace2Path = import.meta.env.VITE_IMMOVABLE_SPACE_2_PATH;

export function LocationDrawerContent({ activeImmovableSpacePath }) {
    const immovableSpace1 = useRecoilValue(immovableSpace1State);
    const immovableSpace2 = useRecoilValue(immovableSpace2State);
    const isDataAvailable = immovableSpace1.sensorData && immovableSpace2.sensorData;
    const activeImmovableSpace = activeImmovableSpacePath === immovableSpace1Path ? useRecoilValue(immovableSpace1State) : useRecoilValue(immovableSpace2State);
    const sensorData = activeImmovableSpace.sensorData;
    const locationStatus = isDataAvailable ? getLocationStatus(activeImmovableSpace) : "";
    return (
        <>
            <div>Level: <b>{activeImmovableSpacePath}</b></div>
            <FreshnessStatusContainer isDataAvailable={isDataAvailable} locationStatus={locationStatus}/>
            <HUTab1 />
            <HUTab2 />
            {!isDataAvailable ? <Text>Loading Sensor Data...</Text>
                : <SensorDataContainer sensorData={sensorData} />
            }
        </>
    )
}

function FreshnessStatusContainer({ isDataAvailable, locationStatus }) {
    return (
        <>
            {isDataAvailable ?
                <Text color={locationStatus.color}>Freshness Status: <b color={locationStatus.color}>{locationStatus.description}</b>
                </Text> :
                <Text>Freshness Status:
                    <b>Unavailable</b>
                </Text>
            }
        </>
    )
}
function HUTab1() {
    return (
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

function HUTab2() {
    return (
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

function getColourForStatus(status) {
    if (status === 'RAW') return 'green.500'
    if (status === 'RIPE') return 'yellow.500'
    if (status === 'ROTTEN') return 'red.500'
    return 'white'
}