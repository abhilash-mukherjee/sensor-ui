export function getLocationStatusFromSensorReading(sensorReading){
    if(sensorReading > 70) return 'ROTTEN';
    if(sensorReading > 50) return 'RIPE';
    if(sensorReading > 46) return 'RAW';
    return 'RAW';
}

export function getColorForState(state){
    if(state === "ROTTEN") return 'red.500';
    if(state === "RIPE") return 'yellow.500';
    if(state === "RAW") return 'green.500';
    return 'white';
}