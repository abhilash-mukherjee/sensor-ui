export function getLocationStatusFromSensorReading(sensorReading){
    if(sensorReading > 70) return 'ROTTEN';
    if(sensorReading > 50) return 'RIPE';
    if(sensorReading > 46) return 'RAW';
    return 'RAW';
}