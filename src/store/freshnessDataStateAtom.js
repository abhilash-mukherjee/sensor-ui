import { atom } from 'recoil';

export const rawQtyState = atom({
  key: 'rawQty',
  default: 12
});

export const ripeQtyState = atom({
    key: 'ripeQtyState',
    default: 9
  });

  export const rottenQtyState = atom({
    key: 'rottenQtyState',
    default: 3
  });


  export const sensorReadingState = atom({
    key: 'sensorReadingState',
    default: 58
  });