import { Box, Grid, GridItem, Text, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex } from '@chakra-ui/react';
import { LocationDrawerContent } from './drawer_components/LocationDrawerContent';

export function ImmovableSpaceInfoDrawer({isOpen, onClose, activeImmovableSpace}) {
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