import { Box, Flex, Text, Badge, Circle, HStack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { rawQtyState, ripeQtyState, rottenQtyState } from "../store/freshnessDataStateAtom";


export default function OverviewContainer() {
  return (
    <>
      <Box>
        <Flex
          gap={10}
          p={6}
        >
          <ZoneRiskIndicator />
          <ZonesReadyToDispatch />
        </Flex >
        <Flex
          paddingInline={6}
          paddingBlock={3}
          flexDir={'column'}
        >
          <GradientBar />
          <Indications />
        </Flex>
      </Box>

    </>
  )
}



const ZoneRiskIndicator = () => {
  const rottingQty = useRecoilValue(rottenQtyState);
  return (
    <Box
      p={3}
      boxShadow="md"
      borderRadius="lg"
      bg="white"
      textAlign="center"
      width="150px" // Adjust size as needed
      height="150px" // Adjust size as needed
    >
      <Text fontSize="5xl" fontWeight="bold" color="red.600" mb={1}>
        {rottingQty}
      </Text>
      <Text fontSize="sm" color="gray.600">
        Zones at risk
      </Text>
    </Box>
  );
};


const ZonesReadyToDispatch = () => {
  const rawQty = useRecoilValue(rawQtyState);
  const ripeQty = useRecoilValue(ripeQtyState);
  return (
    <Box
      p={3}
      boxShadow="md"
      borderRadius="lg"
      bg="white"
      textAlign="center"
      width="150px" // Adjust size as needed
      height="150px" // Adjust size as needed
    >
      <Text fontSize="5xl" fontWeight="bold" color="green.600" mb={1}>
        {ripeQty + rawQty}
      </Text>
      <Text fontSize="sm" color="gray.600">
        Zones Ready to Dispatch
      </Text>
    </Box>
  );
};

const Indications = () => {
  const indications = [
    { label: "Raw", color: "green.500" },
    { label: "Ripe", color: "yellow.400" },
    { label: "Rotten", color: "red.500" }
  ];

  return (
    <HStack spacing={6} px={5} py={2} justifyContent={'center'}>
      {indications.map((indication, index) => (
        <HStack key={index} spacing={2} align="center">
          <Circle size="10px" bg={indication.color} />
          <Text fontWeight="medium">{indication.label}</Text>
          <Text fontWeight="bold">{indication.percentage}</Text>
        </HStack>
      ))}
    </HStack>
  );
};

const GradientBar = () => {
  // Define the colors and their widths
  const segments = [
    { color: 'green.500', width: '55%' },
    { color: 'yellow.500', width: '35%' },
    { color: 'red.500', width: '10%' }
  ];

  return (
    <Flex align="stretch" width="100%" height="32px" borderRadius="md" overflow="hidden">
      {segments.map((segment, index) => (
        <Box
          key={index}
          flex={`0 0 ${segment.width}`}
          bg={segment.color}
          height="100%"
        />
      ))}
    </Flex>
  );
};