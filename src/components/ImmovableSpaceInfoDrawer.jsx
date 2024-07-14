import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/react';
import { LocationDrawerContent } from './drawer_components/LocationDrawerContent';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeImmovableSpacePathState, getImmovableSpaceName } from '../store/activeImmovableSpaceAtom';

export function ImmovableSpaceInfoDrawer() {
    const [activeImmovableSpacePath, setActiveImmovableSpacePath] = useRecoilState(activeImmovableSpacePathState);
    const activeImmovableSpaceName = useRecoilValue(getImmovableSpaceName);
    const isOpen = activeImmovableSpacePath != null;
    const onClose = () => setActiveImmovableSpacePath(null);
    const onCalibrate = () => alert("Calibrate for: " + activeImmovableSpaceName);
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={'md'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Level Details</DrawerHeader>
                    <DrawerBody>
                        <LocationDrawerContent activeImmovableSpacePath={activeImmovableSpacePath} />
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>Close</Button>
                        <Button colorScheme='blue' onClick={onCalibrate}>Calibrate</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}