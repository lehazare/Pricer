import {
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";

import AutocallDrawer from "./AutocallDrawer";
import PricingTable from "../../CommonFeatures/PricingTable";
import { COLUMNS } from "./attributes";

export default function AutocallPage() {
  return (
    <Box bg="colors.bg" color="colors.white" minH="100vh" p={8}>
      <Heading>Autocall</Heading>
      <Flex justifyContent="flex-end">
        <AutocallDrawer />
      </Flex>
      <PricingTable columns={COLUMNS} />
    </Box>
  );
}
