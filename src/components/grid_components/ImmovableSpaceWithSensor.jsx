import { Box, Grid, GridItem, Text, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex } from '@chakra-ui/react';

export function ImmovableSpaceWithSensor({ imovableSpacePath, setActiveImmovableSpace }) {
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