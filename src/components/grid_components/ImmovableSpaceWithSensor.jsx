import { Box, Grid, GridItem, Text, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { activeImmovableSpaceState } from '../../store/activeImmovableSpaceAtom';

export function ImmovableSpaceWithSensor({ imovableSpacePath }) {
    const setActiveImmovableSpace = useSetRecoilState(activeImmovableSpaceState);
    return (
        <>
            <Button
                onClick={() => setActiveImmovableSpace(imovableSpacePath)}
                variant="ghost"
                backgroundColor="transparent"
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                cursor={'pointer'}
                width={'100%'}
                height={'100%'}
            >
                {imovableSpacePath}
            </Button>
        </>
    )
}