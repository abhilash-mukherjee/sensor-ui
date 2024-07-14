const ambientTemperatureMultiplier = import.meta.env.VITE_AMBIENT_TEMP_MULTIPLIER;
const surfaceTemperatureMultiplier = import.meta.env.VITE_SURFACE_TEMP_MULTIPLIER;
const humidityMultiplier = import.meta.env.VITE_HUMIDITY_MULTIPLIER;

export function getFormattedAmbientTemperature(ambientTemperatureDataFromServer, currentGasReading, calibrationFactor) {
    let adjustedTemperature = ambientTemperatureDataFromServer * (1 + ((currentGasReading - calibrationFactor) / calibrationFactor) * ambientTemperatureMultiplier);
    adjustedTemperature = parseFloat(adjustedTemperature.toFixed(1));
    return adjustedTemperature;
}

export function getFormattedSurfaceTemperature(surfaceTemperatureDataFromServer, currentGasReading, calibrationFactor) {
    let adjustedTemperature = surfaceTemperatureDataFromServer * (1 + ((currentGasReading - calibrationFactor) / calibrationFactor) * surfaceTemperatureMultiplier);
    adjustedTemperature = parseFloat(adjustedTemperature.toFixed(1));
    return adjustedTemperature;
}

export function getFormattedHumidity(humidityDataFromServer, currentGasReading, calibrationFactor) {
    let adjustedHumidity = humidityDataFromServer * (1 + ((currentGasReading - calibrationFactor) / calibrationFactor) * humidityMultiplier);
    adjustedHumidity = parseFloat(adjustedHumidity.toFixed(1));
    return adjustedHumidity;
}