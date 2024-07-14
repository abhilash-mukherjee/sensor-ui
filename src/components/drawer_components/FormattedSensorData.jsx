import { getFormattedAmbientTemperature, getFormattedHumidity, getFormattedSurfaceTemperature } from "../../helper/liveDataHelper";
import { Box, Collapse, Flex, IconButton, Text, VStack, useDisclosure } from '@chakra-ui/react';
export function FormattedSensorData({sensorData}) {
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
        </>)
}