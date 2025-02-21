export function getLocationStatusFromSensorReading(sensorReading){
    if(sensorReading > 80) return 'ROTTEN';
    if(sensorReading > 60) return 'RIPE';
    if(sensorReading > 50) return 'RAW';
    return 'RAW';
}

export function getColorForState(state){
    if(state === "ROTTEN") return 'red.500';
    if(state === "RIPE") return 'yellow.500';
    if(state === "RAW") return 'green.500';
    return 'white';
}