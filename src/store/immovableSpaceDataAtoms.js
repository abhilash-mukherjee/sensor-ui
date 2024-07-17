import { atom, selector } from 'recoil';
import { getLocationStatus } from '../helper/helpers';
import { FreshnessStatus } from '../enums/FreshnessStatus';
export const immovableSpace1State = atom({
  key: 'immovableSpace1State',
  default: {},
});

export const immovableSpace2State = atom({
  key: 'immovableSpace2State',
  default: {},
});

const preExistingPrematureZones = parseInt(import.meta.env.VITE_PRE_EXISTING_PREMATURE_ZONES, 10);
const preExistingEdibleZones = parseInt(import.meta.env.VITE_PRE_EXISTING_EDIBLE_ZONES, 10);
const preExistingRottenZones = parseInt(import.meta.env.VITE_PRE_EXISTING_ROTTEN_ZONES, 10);
export const getPrematureZones = selector({
  key: 'getPrematureZones',
  get: ({ get }) => {
      const immovableSpace1 = get(immovableSpace1State);
      const immovableSpace2 = get(immovableSpace2State);
      const countForZone1 = immovableSpace1 && getLocationStatus(immovableSpace1) === FreshnessStatus.Premature ? 1 : 0;
      const countForZone2 = immovableSpace2 && getLocationStatus(immovableSpace1) === FreshnessStatus.Premature ? 1 : 0;
      return preExistingPrematureZones + countForZone1 + countForZone2;
  }
});

export const getEdibleZones = selector({
  key: 'getEdibleZones',
  get: ({ get }) => {
      const immovableSpace1 = get(immovableSpace1State);
      const immovableSpace2 = get(immovableSpace2State);
      const countForZone1 = immovableSpace1 && getLocationStatus(immovableSpace1) === FreshnessStatus.Edible ? 1 : 0;
      const countForZone2 = immovableSpace2 && getLocationStatus(immovableSpace1) === FreshnessStatus.Edible ? 1 : 0;
      return preExistingEdibleZones + countForZone1 + countForZone2;
  }
});


export const getRottenZones = selector({
  key: 'getRottenZones',
  get: ({ get }) => {
      const immovableSpace1 = get(immovableSpace1State);
      const immovableSpace2 = get(immovableSpace2State);
      const countForZone1 = immovableSpace1 && getLocationStatus(immovableSpace1) === FreshnessStatus.Rotten ? 1 : 0;
      const countForZone2 = immovableSpace2 && getLocationStatus(immovableSpace1) === FreshnessStatus.Rotten ? 1 : 0;
      return preExistingRottenZones + countForZone1 + countForZone2;
  }
});