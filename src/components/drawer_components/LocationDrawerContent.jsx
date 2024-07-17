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
            <FreshnessStatusContainer isDataAvailable={isDataAvailable} locationStatus={locationStatus} />
            <TimeSeriesChart readings={[10, 20, 30, 40]} interval={5} />
            {!isDataAvailable ? <Text>Loading Sensor Data...</Text>
                : <SensorDataContainer sensorData={sensorData} />
            }
            <HUTab1 sku={activeImmovableSpace.immovableSpace ? activeImmovableSpace.immovableSpace.sku : "Loading..."} />
            <HUTab2 sku={activeImmovableSpace.immovableSpace ? activeImmovableSpace.immovableSpace.sku : "Loading..."} />
        </>
    )
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

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TimeSeriesChart = ({ readings, interval }) => {
    // Create labels based on the interval
    const labels = readings.map((_, index) => `${index * interval} seconds`);

    const data = {
        labels,
        datasets: [
            {
                label: 'Readings',
                data: readings,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Readings Over Time',
            },
        },
    };

    return (
        <Box border="1px" borderColor="gray.200" p={4}>
            <Line data={data} options={options} />
        </Box>
    );
};

export default TimeSeriesChart;
