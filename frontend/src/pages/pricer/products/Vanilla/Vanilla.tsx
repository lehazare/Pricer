import {
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";

import VanillaDrawer from "./VanillaDrawer";
import PricingTable from "../../CommonFeatures/PricingTable";
import {COLUMNS} from "./attributes";

export default function VanillaPage() {
  return (
    <Box bg="colors.bg" color="colors.white" minH="100vh" p={8}>
      <Heading>Vanilla Option</Heading>
      <Flex justifyContent="flex-end">
        <VanillaDrawer />
      </Flex>
      <PricingTable columns={COLUMNS} />
    </Box>
  );
}
