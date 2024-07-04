import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { rawQtyState, ripeQtyState, rottenQtyState, sensorReadingState } from '../store/freshnessDataStateAtom';
import { getLocationStatusFromSensorReading } from '../helper/helpers';

const InitComponent = () => {
    const [rawQty, setRawQty] = useRecoilState(rawQtyState);
    const [ripeQty, setRipeQty] = useRecoilState(ripeQtyState);
    const [rottenQty, setRottenQty] = useRecoilState(rottenQtyState);
    const [sensorReading, setSensorReading] = useRecoilState(sensorReadingState);
    useEffect(() => {
        const fetchLevelData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/levels/6686e350b01b4150f34c04be');
                if (!response.ok) throw new Error('Network response was not ok.');
                const data = await response.json();
                const ripenessValue = data.ripenessValue;
                const prevState = getLocationStatusFromSensorReading(sensorReading);
                var tempRawQty = rawQty;
                var tempRipeQty = ripeQty;
                var tempRottenQty = rottenQty;
                if(prevState === "RAW") {
                    tempRawQty--;
                }
                if(prevState === "RIPE") {
                    tempRipeQty--;
                }
                if(prevState === "ROTTEN") {
                    tempRottenQty--;
                }
                console.log(`**Transient states1: ${tempRawQty}, ${tempRipeQty}, ${tempRottenQty}`)
                const currentState = getLocationStatusFromSensorReading(ripenessValue);
                if(currentState === "RAW") {
                    tempRawQty++;
                }
                if(currentState === "RIPE") {
                    tempRipeQty++;
                }
                if(currentState === "ROTTEN") {
                    tempRottenQty++;
                }
                setRawQty(tempRawQty);
                setRipeQty(tempRipeQty)
                setRottenQty(tempRottenQty);
                console.log(`**Transient states2: ${tempRawQty}, ${tempRipeQty}, ${tempRottenQty}`)
                setSensorReading(ripenessValue);
                console.log(`**Transient states3: ${tempRawQty}, ${tempRipeQty}, ${tempRottenQty}`)
            } catch (error) {
                console.error('Failed to fetch level data:', error);
            }
        };

        const intervalId = setInterval(fetchLevelData, 2000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <></>
    );
};

export default InitComponent;
