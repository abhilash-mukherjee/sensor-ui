import React, { useEffect } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { immovableSpace1State, immovableSpace2State } from '../store/immovableSpaceDataAtoms';  // Ensure both atoms are imported

const baseUrl = import.meta.env.VITE_BASE_URL;
const authToken = import.meta.env.VITE_AUTH_TOKEN;
const immovableSpace1 = import.meta.env.VITE_IMMOVABLE_SPACE_1;
const immovableSpace2 = import.meta.env.VITE_IMMOVABLE_SPACE_2;

export const InitComponent = () => {
    const setImmovableSpace1 = useSetRecoilState(immovableSpace1State);
    const setImmovableSpace2 = useSetRecoilState(immovableSpace2State);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make both requests concurrently
                const responses = await Promise.all([
                    axios.get(`${baseUrl}/immovable-space/${immovableSpace1}`, {
                        headers: { 'Authorization': `Bearer ${authToken}` }
                    }),
                    axios.get(`${baseUrl}/immovable-space/${immovableSpace2}`, {
                        headers: { 'Authorization': `Bearer ${authToken}` }
                    })
                ]);

                // Check if both responses are OK
                if (responses[0].status === 200) {
                    setImmovableSpace1(responses[0].data);
                    console.log(responses[0].data);
                } else {
                    throw new Error('Network response for IMV1 was not ok.');
                }
                
                if (responses[1].status === 200) {
                    setImmovableSpace2(responses[1].data);
                    console.log(responses[1].data);
                } else {
                    throw new Error('Network response for IMV2 was not ok.');
                }
                
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        // Set an interval to fetch data every 2000 milliseconds
        const intervalId = setInterval(fetchData, 2000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    return (
        <></>
    );
};



// const InitComponent = () => {
//     const [rawQty, setRawQty] = useRecoilState(rawQtyState);
//     const [ripeQty, setRipeQty] = useRecoilState(ripeQtyState);
//     const [rottenQty, setRottenQty] = useRecoilState(rottenQtyState);
//     const [sensorReading, setSensorReading] = useRecoilState(sensorReadingState);
//     useEffect(() => {
//         const fetchLevelData = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/api/levels/6686e350b01b4150f34c04be');
//                 if (!response.ok) throw new Error('Network response was not ok.');
//                 const data = await response.json();
//                 const ripenessValue = data.ripenessValue;
//                 const prevState = getLocationStatusFromSensorReading(sensorReading);
//                 var tempRawQty = rawQty;
//                 var tempRipeQty = ripeQty;
//                 var tempRottenQty = rottenQty;
//                 if(prevState === "RAW") {
//                     tempRawQty--;
//                 }
//                 if(prevState === "RIPE") {
//                     tempRipeQty--;
//                 }
//                 if(prevState === "ROTTEN") {
//                     tempRottenQty--;
//                 }
//                 console.log(`**Transient states1: ${tempRawQty}, ${tempRipeQty}, ${tempRottenQty}`)
//                 const currentState = getLocationStatusFromSensorReading(ripenessValue);
//                 if(currentState === "RAW") {
//                     tempRawQty++;
//                 }
//                 if(currentState === "RIPE") {
//                     tempRipeQty++;
//                 }
//                 if(currentState === "ROTTEN") {
//                     tempRottenQty++;
//                 }
//                 setRawQty(tempRawQty);
//                 setRipeQty(tempRipeQty)
//                 setRottenQty(tempRottenQty);
//                 console.log(`**Transient states2: ${tempRawQty}, ${tempRipeQty}, ${tempRottenQty}`)
//                 setSensorReading(ripenessValue);
//                 console.log(`**Transient states3: ${tempRawQty}, ${tempRipeQty}, ${tempRottenQty}`)
//             } catch (error) {
//                 console.error('Failed to fetch level data:', error);
//             }
//         };

//         const intervalId = setInterval(fetchLevelData, 2000);

//         return () => clearInterval(intervalId); // Cleanup interval on component unmount
//     }, []);

//     return (
//         <></>
//     );
// };

export default InitComponent;
