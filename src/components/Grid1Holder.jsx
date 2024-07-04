import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';

const colorOptions = ['green.500', 'yellow.400', 'red.500']; // Chakra UI color codes

function getRandomColor() {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
}

const Grid1Holder = () => {
    return (
        <Box maxW="container.md" p={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Grid templateColumns="repeat(9, 1fr)" gap={4}>
                {Array.from({ length: 27 }).map((_, index) => ( // 27 cells, 3 rows of 9 columns each
                    <GridItem 
                        w="100%" 
                        h="20" 
                        bg={getRandomColor()} 
                        key={index} 
                        borderRadius="md"
                    />
                ))}
            </Grid>
        </Box>
    );
}

export default Grid1Holder;
