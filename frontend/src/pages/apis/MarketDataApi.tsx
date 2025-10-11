import { Box, Heading } from "@chakra-ui/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function MarketDataApi() {
  return (
    <Box bg="colors.bg" color="colors.white" minH="100vh" p={8}>
      <Heading>Market Data API</Heading>
        <SwaggerUI url="https://marketdata.leolazare.fr/openapi.json" />
    </Box>
  );
}
