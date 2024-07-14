import { Box, Grid, GridItem, Text, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Flex } from '@chakra-ui/react';

export function ImmovableSpaceWithoutSensor({imovableSpacePath}) {
    return (
        <>
            <Button
                onClick={() => alert("No sensor installed corresponding to this location")}
                variant="ghost"
                backgroundColor="transparent"
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                cursor={'default'}
                width={'100%'}
                height={'100%'}
            >
                {imovableSpacePath}
            </Button>
        </>
    )
}