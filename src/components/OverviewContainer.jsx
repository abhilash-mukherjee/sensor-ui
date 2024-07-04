import { Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { rawQtyState, ripeQtyState, rottenQtyState } from "../store/freshnessDataStateAtom";


export default function OverviewContainer() {
    return (
        <>
            <Flex
                p={4}
                gap={10}
                >

                <ZoneRiskIndicator />
                <ZonesReadyToDispatch />
            </Flex >

        </>
    )
}



const ZoneRiskIndicator = () => {
    const rottingQty = useRecoilValue(rottenQtyState);
  return (
    <Box
      p={4}
      boxShadow="md"
      borderRadius="lg"
      bg="white"
      textAlign="center"
      width="150px" // Adjust size as needed
      height="150px" // Adjust size as needed
    >
      <Text fontSize="5xl" fontWeight="bold" color="red.600" mb={2}>
        {rottingQty}
      </Text>
      <Text fontSize="md" color="gray.600">
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
      p={4}
      boxShadow="md"
      borderRadius="lg"
      bg="white"
      textAlign="center"
      width="150px" // Adjust size as needed
      height="150px" // Adjust size as needed
    >
      <Text fontSize="5xl" fontWeight="bold" color="green.600" mb={2}>
        {ripeQty + rawQty}
      </Text>
      <Text fontSize="md" color="gray.600">
        Zones Ready to Dispatch
      </Text>
    </Box>
  );
};



