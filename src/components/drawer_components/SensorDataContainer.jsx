import React, { useState } from 'react';
import { Box, Collapse, Flex, IconButton, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FormattedSensorData } from './FormattedSensorData';

export function SensorDataContainer({sensorData}) {
    const { isOpen, onToggle } = useDisclosure();
    const [rotate, setRotate] = useState(false);

    const handleToggle = () => {
        onToggle();
        setRotate(!rotate);
    };

    if(!sensorData) {
        return (<></>)
    }

    return (
        <Box width="100%" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" bg="gray.100" marginTop={4}>
            <Flex justify="space-between" align="center"
                onClick={handleToggle}
                cursor={'pointer'}
            >
                <Box fontWeight="bold">
                    <Text size={'lg'}>Live Sensor Data</Text>
                </Box>
                <IconButton
                    onClick={handleToggle}
                    icon={<ChevronDownIcon transform={rotate ? "rotate(180deg)" : "rotate(0deg)"} />}
                    aria-label="Toggle Details"
                    variant="ghost"
                />
            </Flex>
            <Collapse in={isOpen}>
                <VStack p={4} align="start" spacing={3}>
                    {!sensorData.isCalibrated ?
                        <>
                            <Text>Calibrate sensor to see live data</Text>
                        </>
                        :
                        <>
                            <FormattedSensorData sensorData={sensorData}/>
                        </>
                    }
                </VStack>
            </Collapse>
        </Box>
    );
}


