import { Box } from "@chakra-ui/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
const apiMarketData = import.meta.env.VITE_API_MARKETDATA;

export default function MarketDataApi() {
  const url = `${apiMarketData}/openapi.json`;
  return (
    <Box bg="colors.bg" color="colors.white" minH="100vh" p={8}>
        <SwaggerUI url={url}/>
    </Box>
  );
}
