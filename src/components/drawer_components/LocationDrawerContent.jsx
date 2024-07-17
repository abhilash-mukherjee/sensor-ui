import { useRecoilValue } from "recoil";
import { sensorReadingState } from "../../store/freshnessDataStateAtom";
import { getLocationStatus, getLocationStatusFromSensorReading, getPrediction } from "../../helper/helpers";
import { Box, Text, Flex } from '@chakra-ui/react';
import { immovableSpace1State, immovableSpace2State } from "../../store/immovableSpaceDataAtoms";
import { SensorDataContainer } from '../drawer_components/SensorDataContainer'
import TimeSeriesChart from "./TimeSeriesChart";
import { ChartContainer } from "./ChartContainer";
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
            <FreshnessStatusContainer isDataAvailable={isDataAvailable} locationStatus={locationStatus} />
            {!isDataAvailable ? <Text>Loading Sensor Data...</Text>
                :
                <>
                    <ChartContainer activeImmovableSpacePath={activeImmovableSpacePath} locationStatus={locationStatus} />
                    <PredictionContainer activeImmovableSpace= {activeImmovableSpace}/>
                    <SensorDataContainer sensorData={sensorData} />
                </>
            }
            <HUTab1 sku={activeImmovableSpace.immovableSpace ? activeImmovableSpace.immovableSpace.sku : "Loading..."} />
            <HUTab2 sku={activeImmovableSpace.immovableSpace ? activeImmovableSpace.immovableSpace.sku : "Loading..."} />
        </>
    )
}
function PredictionContainer({ activeImmovableSpace }) {
    const prediction = getPrediction(activeImmovableSpace);

    const renderPrediction = () => {
        if (prediction.includes("Ripen By")) {
            const [ripeByPart, rotByPart] = prediction.split(', Rott By: ');
            const ripeDate = ripeByPart.replace('Ripen By: ', '');
            const rotDate = rotByPart;

            return (
                <>
                    <Text fontWeight="bold">
                        <Text as="span" fontWeight="bold" color="yellow.500">Ripen By:</Text> {ripeDate}
                    </Text>
                    <Text fontWeight="bold">
                        <Text as="span" fontWeight="bold" color="red.500">Rott By:</Text> {rotDate}
                    </Text>
                </>
            );
        } else if (prediction === "Already rotten.") {
            return (
                <Text fontWeight="bold" color="red.500">{prediction}</Text>
            );
        } else if (prediction.includes("Rott by")) {
            const rotDate = prediction.replace('Rott by ', '');
            return (
                <Text fontWeight="bold">
                    <Text as="span"  color="red.500">Rott By:</Text> {rotDate}
                </Text>
            );
        } else {
            return <Text fontWeight="bold">{prediction}</Text>;  // Default or error case
        }
    };

    return (
        <Box
            bg={'gray.100'}
            borderRadius="md"
            paddingInline={4}
            marginTop={4}
            paddingBlock={2}>
            {renderPrediction()}
        </Box>
    );
}

function FreshnessStatusContainer({ isDataAvailable, locationStatus }) {
    return (
        <>
            <Flex mb={5}>
                {isDataAvailable ?
                    <Text color={locationStatus.color}>Freshness Status: <b color={locationStatus.color}>{locationStatus.description}</b>
                    </Text> :
                    <Text>Freshness Status:
                        <b>Unavailable</b>
                    </Text>
                }
            </Flex>
        </>
    )
}
function HUTab1({ sku }) {
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
                    <Text>Item: <b>{sku}</b></Text>
                </Flex>
                <Flex justifyContent={'space-between'}>
                    <Text>SKU ID: <b>S92020398</b></Text>
                    <Text>Vendor: <b>Vendor1</b></Text>
                </Flex>
            </Box>
        </>
    )
}

function HUTab2({ sku }) {
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
                    <Text>Item: <b>{sku}</b></Text>
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

