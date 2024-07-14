import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/react';
import { LocationDrawerContent } from './drawer_components/LocationDrawerContent';
import { useRecoilState } from 'recoil';
import { activeImmovableSpaceState } from '../store/activeImmovableSpaceAtom';

export function ImmovableSpaceInfoDrawer() {
    const [activeImmovableSpace, setActiveImmovableSpace] = useRecoilState(activeImmovableSpaceState);
    const isOpen = activeImmovableSpace != null;
    const onClose = () => setActiveImmovableSpace(null);
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
                        <LocationDrawerContent activeImmovableSpace={activeImmovableSpace} />
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                        <Button colorScheme='blue' onClick={onClose}>Close</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}