import { Box, Heading } from "@chakra-ui/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SchedulingApi() {
  return (
    <Box bg="colors.bg" color="colors.white" minH="100vh" p={8}>
      <Heading>Scheduling API</Heading>
        <SwaggerUI url="https://scheduling.leolazare.fr/swagger/v1/swagger.json" />
    </Box>
  );
}
