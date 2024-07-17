import { FreshnessStatus } from "../enums/FreshnessStatus";
import { thresholdData } from "./thresholds";
export function getLocationStatusFromSensorReading(sensorReading) {
    if (sensorReading > 80) return 'ROTTEN';
    if (sensorReading > 53) return 'RIPE';
    return 'RAW';
}

export function getColorForState(state) {
    if (state === "ROTTEN") return 'red.500';
    if (state === "RIPE") return 'yellow.500';
    if (state === "RAW") return 'green.500';
    return 'white';
}

export function getLocationStatus(immovableSpaceData) {
    if (!immovableSpaceData.sensorData || !immovableSpaceData.immovableSpace) return FreshnessStatus.Premature;
    console.log("Querying location status for :", immovableSpaceData)
    const thresholdForSensor = thresholdData[immovableSpaceData.sensorData.name];
    const data = thresholdForSensor[immovableSpaceData.immovableSpace.sku]
    console.log("Data = ", data)
    const gasReading = immovableSpaceData.sensorData.gasReading;
    const calibrationFactor = immovableSpaceData.sensorData.calibrationFactor;
    console.log("Gas reading ------", gasReading)
    if (!gasReading || !calibrationFactor) return FreshnessStatus.Premature;
    const diff = gasReading - calibrationFactor;
    if (diff <= data.edibleThreshold) {
        return FreshnessStatus.Premature;
    }
    if (diff <= data.rottingThreshold) {
        return FreshnessStatus.Edible;
    }
    if (diff > data.rottingThreshold) {
        return FreshnessStatus.Rotten;
    }
    return FreshnessStatus.Premature;
}


export function getPrediction(immovableSpaceData) {
    if (!immovableSpaceData.sensorData || !immovableSpaceData.immovableSpace) {
        return FreshnessStatus.Premature;
    }

    console.log("Querying location status for :", immovableSpaceData);

    const sensorName = immovableSpaceData.sensorData.name;
    const productSKU = immovableSpaceData.immovableSpace.sku;
    const thresholdForSensor = thresholdData[sensorName];
    const data = thresholdForSensor[productSKU];

    console.log("Data = ", data);

    const gasReading = immovableSpaceData.sensorData.gasReading;
    const calibrationFactor = immovableSpaceData.sensorData.calibrationFactor;

    console.log("Gas reading ------", gasReading);

    if (!gasReading || !calibrationFactor) {
        return FreshnessStatus.Premature;
    }

    const currentStatus = getLocationStatus(immovableSpaceData);
    const diff = gasReading - calibrationFactor;

    const daysToRipe = getDaysToRipe(diff, data.edibleThreshold, data.rottingThreshold, data.lifespan);
    const daysToRot = getDaysToRot(diff, data.rottingThreshold, data.lifespan);

    function getDateAfterDays(days) {
        console.log("#################After days: ", days)
        const resultDate = new Date();
        resultDate.setDate(resultDate.getDate() + days); // Adds the specified number of days to today's date
    
        // Formats the date as "Sep 27, 2024" style
        return resultDate.toLocaleDateString('en-US', {
            month: 'short', // "short" for abbreviated month name
            day: 'numeric',  // numeric day of the month
            year: 'numeric'  // numeric year
        });
    }
    

    switch (currentStatus) {
        case FreshnessStatus.Premature:
            const ripeDate = getDateAfterDays(daysToRipe);
            const rotDate = getDateAfterDays(daysToRot);
            return `Ripen By: ${ripeDate}, Rott By: ${rotDate}`;

        case FreshnessStatus.Edible:
            const dateToRot = getDateAfterDays(daysToRot);
            return `Rott by ${dateToRot}`;

        case FreshnessStatus.Rotten:
            return "Already rotten";

        default:
            return FreshnessStatus.Premature;
    }
}

function getDaysToRipe(diff, ripeThreshold,rottingThreshold, lifespan) {
    if(diff > ripeThreshold) return 0;
    const whichDay = lifespan * diff/rottingThreshold;
    const ripeDAY = lifespan * ripeThreshold/rottingThreshold;
    return Math.ceil(ripeDAY - whichDay);
}

function getDaysToRot(diff,rottingThreshold, lifespan) {
    if(diff > rottingThreshold) return 0;
    const whichDay = lifespan * diff/rottingThreshold;
    var rotVal = Math.ceil(lifespan - whichDay);
    if(rotVal > lifespan) return lifespan;
    return rotVal;
}
