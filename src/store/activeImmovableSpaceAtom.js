import { atom, selector } from 'recoil';

const immovableSpace1 = import.meta.env.VITE_IMMOVABLE_SPACE_1;
const immovableSpace2 = import.meta.env.VITE_IMMOVABLE_SPACE_2;
const immovableSpace1Path = import.meta.env.VITE_IMMOVABLE_SPACE_1_PATH;
const immovableSpace2Path = import.meta.env.VITE_IMMOVABLE_SPACE_2_PATH;

export const activeImmovableSpacePathState = atom({
    key: 'activeImmovableSpacePathState',
    default: null
});

export const getImmovableSpaceName = selector({
    key: 'getImmovableSpaceName',
    get: ({ get }) => {
        const path = get(activeImmovableSpacePathState);
        if(path === immovableSpace1Path) return immovableSpace1;
        if(path === immovableSpace2Path) return immovableSpace2;
        return "Unknown"
    }
});
