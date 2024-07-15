import { getFormattedAmbientTemperature, getFormattedHumidity, getFormattedSurfaceTemperature } from "../../helper/liveDataHelper";
import { Box, Collapse, Flex, IconButton, Text, VStack, useDisclosure } from '@chakra-ui/react';

// Utility function to format dates
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
};

export function FormattedSensorData({ sensorData }) {
    return (
        <>
            <Text><strong>Surface Temp:</strong> {getFormattedSurfaceTemperature(sensorData.surfaceTempReading, sensorData.gasReading, sensorData.calibrationFactor)}
            °C</Text>
            <Text><strong>Ambient Temp:</strong> {getFormattedAmbientTemperature(sensorData.ambientTempReading, sensorData.gasReading, sensorData.calibrationFactor)}
            °C</Text>
            <Text><strong>Humidity:</strong> {getFormattedHumidity(sensorData.humidityReading, sensorData.gasReading, sensorData.calibrationFactor)}
            %</Text>
            <Text><strong>Gas Reading:</strong> {sensorData.gasReading}</Text>
            <Text><strong>Linked Space:</strong> {sensorData.immovableSpaceName}</Text>
            <Text><strong>Calibration Factor:</strong> {sensorData.calibrationFactor}</Text>
            {sensorData.lastCalibrated && (
                <Text><strong>Last Calibrated:</strong> {formatDate(sensorData.lastCalibrated)}</Text>
            )}
        </>
    );
}
