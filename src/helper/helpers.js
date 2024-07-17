import { FreshnessStatus } from "../enums/FreshnessStatus";
import { thresholdData } from "./thresholds";
export function getLocationStatusFromSensorReading(sensorReading){
    if(sensorReading > 80) return 'ROTTEN';
    if(sensorReading > 53) return 'RIPE';
    return 'RAW';
}

export function getColorForState(state){
    if(state === "ROTTEN") return 'red.500';
    if(state === "RIPE") return 'yellow.500';
    if(state === "RAW") return 'green.500';
    return 'white';
}

export function getLocationStatus(immovableSpaceData) {
    if(!immovableSpaceData.sensorData || !immovableSpaceData.immovableSpace) return FreshnessStatus.Premature;
    console.log("Querying location status for :",immovableSpaceData)
    const data = thresholdData[immovableSpaceData.immovableSpace.sku];  
    console.log("Data = ", data)  
    const gasReading = immovableSpaceData.sensorData.gasReading;
    const calibrationFactor = immovableSpaceData.sensorData.calibrationFactor;
    console.log("Gas reading ------", gasReading)
    if(!gasReading || !calibrationFactor) return FreshnessStatus.Premature;
    const diff = gasReading - calibrationFactor;
    if(diff <= data.edibleThreshold) {
        return FreshnessStatus.Premature;
    }
    if(diff <= data.rottingThreshold) {
        return FreshnessStatus.Edible;
    }
    if(diff > data.rottingThreshold) {
        return FreshnessStatus.Rotten;
    }
    return FreshnessStatus.Premature;
}