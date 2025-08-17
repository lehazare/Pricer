import {
  Box,
  Flex,
} from "@chakra-ui/react";

import AutocallDrawer from "./AutocallDrawer";
import PricingTable from "../UsefulFeatures/PricingTable";

export default function AutocallPage() {
  return (
    <Box bg="colors.bg" color="colors.white" minH="100vh" p={8}>
      <Flex justifyContent="flex-end">
        <AutocallDrawer />
      </Flex>
      <PricingTable />
    </Box>
  );
}
