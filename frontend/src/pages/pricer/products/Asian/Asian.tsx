import {
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";

import AsianDrawer from "./AsianDrawer";
import PricingTable from "../../CommonFeatures/PricingTable";
import { COLUMNS } from "./attributes";

export default function AutocallPage() {
  return (
    <Box bg="colors.bg" color="colors.white" minH="100vh" p={{ base: "0", md: "8" }}>
      <Heading>Asian Option</Heading>
      <Flex justifyContent="flex-end">
        <AsianDrawer />
      </Flex>
      <PricingTable columns={COLUMNS} />
    </Box>
  );
}
