import { Box } from "@chakra-ui/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
const apiPricing = import.meta.env.VITE_API_PRICING;

export default function PricingApi() {
  const url = `${apiPricing}/swagger/v1/swagger.json`;
  return (
    <Box bg="colors.bg" color="colors.white" minH="100vh" p={8}>
        <SwaggerUI url={url}/>
    </Box>
  );
}
