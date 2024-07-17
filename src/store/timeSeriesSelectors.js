import { selectorFamily } from 'recoil';
import { immovableSpace1TimeSeriesState, immovableSpace2TimeSeriesState } from './immovableSpaceDataAtoms';
import { getFormattedAmbientTemperature, getFormattedHumidity, getFormattedSurfaceTemperature } from '../helper/liveDataHelper';

const immovableSpace1Path = import.meta.env.VITE_IMMOVABLE_SPACE_1_PATH;
const immovableSpace2Path = import.meta.env.VITE_IMMOVABLE_SPACE_2_PATH;

export const surfaceTempReadingSelector = selectorFamily({
    key: 'surfaceTempReadingSelector',
    get: (activeImmovableSpacePath) => ({ get }) => {
        let readings = [];
        if (activeImmovableSpacePath === immovableSpace1Path) {
            readings = get(immovableSpace1TimeSeriesState);
        } else if (activeImmovableSpacePath === immovableSpace2Path) {
            readings = get(immovableSpace2TimeSeriesState);
        }
        console.log("###############", readings)
        // Map to extract surfaceTempReading from sensorData
        return readings.map((entry) => {
            if (entry.surfaceTempReading && entry.gasReading && entry.calibrationFactor)
                return getFormattedSurfaceTemperature(entry.surfaceTempReading, entry.gasReading, entry.calibrationFactor)
            else entry;
        }).filter(temp => temp !== undefined);
    }
});

export const humidityReadingSelector = selectorFamily({
    key: 'humidityReadingSelector',
    get: (activeImmovableSpacePath) => ({ get }) => {
        let readings = [];
        if (activeImmovableSpacePath === immovableSpace1Path) {
            readings = get(immovableSpace1TimeSeriesState);
        } else if (activeImmovableSpacePath === immovableSpace2Path) {
            readings = get(immovableSpace2TimeSeriesState);
        }
        console.log("###############", readings)
        // Map to extract humidity from sensorData
        return readings.map((entry) => {
            if (entry.humidityReading && entry.gasReading && entry.calibrationFactor)
                return getFormattedHumidity(entry.humidityReading, entry.gasReading, entry.calibrationFactor)
            else entry;
        }).filter(temp => temp !== undefined);
    }
});

export const gasReadingSelector = selectorFamily({
    key: 'gasReadingSelector',
    get: (activeImmovableSpacePath) => ({ get }) => {
        let readings = [];
        if (activeImmovableSpacePath === immovableSpace1Path) {
            readings = get(immovableSpace1TimeSeriesState);
        } else if (activeImmovableSpacePath === immovableSpace2Path) {
            readings = get(immovableSpace2TimeSeriesState);
        }
        console.log("###############", readings)
        // Map to extract surfaceTempReading from sensorData
        return readings.map(entry => entry.gasReading).filter(temp => temp !== undefined);
    }
});

export const ambientTempReadingSelector = selectorFamily({
    key: 'ambientTempReadingSelector',
    get: (activeImmovableSpacePath) => ({ get }) => {
        let readings = [];
        if (activeImmovableSpacePath === immovableSpace1Path) {
            readings = get(immovableSpace1TimeSeriesState);
        } else if (activeImmovableSpacePath === immovableSpace2Path) {
            readings = get(immovableSpace2TimeSeriesState);
        }
        console.log("###############", readings)
        // Map to extract surfaceTempReading from sensorData
        return readings.map((entry) => {
            if (entry.ambientTempReading && entry.gasReading && entry.calibrationFactor)
                return getFormattedAmbientTemperature(entry.ambientTempReading, entry.gasReading, entry.calibrationFactor)
            else entry;
        }).filter(temp => temp !== undefined);
    }
});