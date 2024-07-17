import React, { useState } from 'react';
import { useRecoilValue } from "recoil";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import TimeSeriesChart from "./TimeSeriesChart";
import { surfaceTempReadingSelector, gasReadingSelector, humidityReadingSelector, ambientTempReadingSelector } from "../../store/timeSeriesSelectors";

const minSurfTemp = import.meta.env.VITE_MIN_SURF_TEMP;
const maxSurfTemp = import.meta.env.VITE_MAX_SURF_TEMP;
const minAmbTemp = import.meta.env.VITE_MIN_AMBIENT_TEMP;
const maxAmbTemp = import.meta.env.VITE_MAX_AMBIENT_TEMP;
const minAmbHum = import.meta.env.VITE_MIN_HUM;
const maxAmbHum = import.meta.env.VITE_MAX_HUM;
const minGas = import.meta.env.VITE_MIN_GAS;
const maxGas = import.meta.env.VITE_MAX_GAS;

export function ChartContainer({ activeImmovableSpacePath, locationStatus }) {
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabsChange = index => {
        setTabIndex(index);
    };

    const surfaceTemperatures = useRecoilValue(surfaceTempReadingSelector(activeImmovableSpacePath));
    const gasReadings = useRecoilValue(gasReadingSelector(activeImmovableSpacePath));
    const ambientHumidity = useRecoilValue(humidityReadingSelector(activeImmovableSpacePath));
    const ambientTemperature = useRecoilValue(ambientTempReadingSelector(activeImmovableSpacePath));

    return (
        <>
            <Box
                borderColor={'grey.300'}
                borderWidth={'2px'}
                borderRadius="md"
                paddingInline={4}
            >
                <Tabs index={tabIndex} onChange={handleTabsChange}>
                    <TabList>
                        <Tab fontSize="xs">Gas Reading</Tab>
                        <Tab fontSize="xs">Surface Temperature</Tab>
                        <Tab fontSize="xs">Ambient Humidity</Tab>
                        <Tab fontSize="xs">Ambient Temperature</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <TimeSeriesChart readings={gasReadings}
                                locationStatus={locationStatus}
                                interval={5}
                                minY={minGas}
                                maxY={maxGas}
                                yLabel="Gas Readings"
                                xLabel="Time (seconds)"
                                chartLabel="Gas Readings Over Time"
                                readingLabel="Gas Concentration"
                            />
                        </TabPanel>
                        <TabPanel>
                            <TimeSeriesChart readings={surfaceTemperatures}
                                locationStatus={locationStatus}
                                interval={5}
                                minY={minSurfTemp}
                                maxY={maxSurfTemp}
                                yLabel="Temperature (°C)"
                                xLabel="Time (seconds)"
                                chartLabel="Surface Temperature Readings Over Time"
                                readingLabel="Surface Temperature"
                            />
                        </TabPanel>
                        <TabPanel>
                            <TimeSeriesChart readings={ambientHumidity}
                                locationStatus={locationStatus}
                                interval={5}
                                minY={minAmbHum}
                                maxY={maxAmbHum}
                                yLabel="Humidity (%)"
                                xLabel="Time (seconds)"
                                chartLabel="Ambient Humidity Readings Over Time"
                                readingLabel="Humidity"
                            />
                        </TabPanel>
                        <TabPanel>
                            <TimeSeriesChart readings={ambientTemperature}
                                locationStatus={locationStatus}
                                interval={5}
                                minY={minAmbTemp}
                                maxY={maxAmbTemp}
                                yLabel="Temperature (°C)"
                                xLabel="Time (seconds)"
                                chartLabel="Ambient Temperature Readings Over Time"
                                readingLabel="Ambient Temperature"
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
}
