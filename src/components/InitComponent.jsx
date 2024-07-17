import React, { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { immovableSpace1State, immovableSpace2State, immovableSpace1TimeSeriesState, immovableSpace2TimeSeriesState } from '../store/immovableSpaceDataAtoms';  // Ensure all atoms are imported

const baseUrl = import.meta.env.VITE_BASE_URL;
const authToken = import.meta.env.VITE_AUTH_TOKEN;
const immovableSpace1 = import.meta.env.VITE_IMMOVABLE_SPACE_1;
const immovableSpace2 = import.meta.env.VITE_IMMOVABLE_SPACE_2;
const maxArrayLength = parseInt(import.meta.env.VITE_TIMESERIES_ARRAY_LENGTH, 10); // Ensure this is a number

export const InitComponent = () => {
    const setImmovableSpace1 = useSetRecoilState(immovableSpace1State);
    const setImmovableSpace2 = useSetRecoilState(immovableSpace2State);
    const setImmovableSpace1TimeSeries = useSetRecoilState(immovableSpace1TimeSeriesState);
    const setImmovableSpace2TimeSeries = useSetRecoilState(immovableSpace2TimeSeriesState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(`${baseUrl}/immovable-space/${immovableSpace1}`, { headers: { 'Authorization': `Bearer ${authToken}` } }),
                    axios.get(`${baseUrl}/immovable-space/${immovableSpace2}`, { headers: { 'Authorization': `Bearer ${authToken}` } })
                ]);

                responses.forEach((response, index) => {
                    if (response.status === 200 && response.data.sensorData) {
                        if (index === 0) {
                            setImmovableSpace1(response.data);
                            updateFifoQueue(setImmovableSpace1TimeSeries, response.data.sensorData);
                        } else {
                            setImmovableSpace2(response.data);
                            updateFifoQueue(setImmovableSpace2TimeSeries, response.data.sensorData);
                        }
                    } else {
                        throw new Error(`Network response for IMV${index + 1} was not ok.`);
                    }
                });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        const updateFifoQueue = (setFunction, newEntry) => {
            setFunction(prevArray => {
                const newArray = [...prevArray, newEntry];
                if (newArray.length > maxArrayLength) {
                    newArray.shift();  // Remove the oldest entry to maintain the max length
                }
                return newArray;
            });
        };

        const intervalId = setInterval(fetchData, 2000);
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    return <></>;
};

export default InitComponent;
