import { Box, Heading, HStack, VStack, Image, Text, Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";

export default function AsianDrawer() {
  return (
    <Drawer.Root size="xl">
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm" bg="colors.purple" color="colors.black">
          What is an Asian Option ?
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="colors.purple">
            <Drawer.Body>
              <VStack>
                <Heading color="colors.black" size="xl"> Autocall </Heading>
                <Text fontSize="md" color="colors.white" textAlign="justify">
                  An Autocall is a structured financial product
                  that can be redeemed early if certain conditions are met on predefined dates.
                  It generally offers an attractive coupon but also carries risks linked to
                  the performance of the underlying asset(s).
                </Text>

                <VStack align="start" gap={12} w="100%">
                  <HStack align="center" gap={8} w="100%" flexDir={{ base: "column", md: "row" }}>
                    <Image
                      src="/autocall/autocall-1.gif"
                      alt="Early redemption scenario"
                      borderRadius="lg"
                      boxShadow="lg"
                      maxW="600px"
                      w="100%"
                      objectFit="cover"
                    />
                    <Box>
                      <Heading size="md" color="colors.black">Scenario 1 - Early Redemption</Heading>
                      <Text mt={2} fontSize="md" color="white" textAlign="justify">
                        If, on one of the observation dates, the underlying is above its initial level,
                        the product is automatically redeemed early.
                        The investor receives the invested capital plus the accumulated coupons.
                        This scenario represents the most favorable case for the investor.
                      </Text>
                    </Box>
                  </HStack>

                  <HStack align="center" gap={8} w="100%" flexDir={{ base: "column", md: "row-reverse" }}>
                    <Image
                      src="/autocall/autocall-2.gif"
                      alt="Final redemption at maturity"
                      borderRadius="lg"
                      boxShadow="lg"
                      maxW="600px"
                      w="100%"
                      objectFit="cover"
                    />
                    <Box>
                      <Heading size="md" color="colors.black">Scenario 2 - Redemption at Maturity</Heading>
                      <Text mt={2} fontSize="md" color="colors.white" textAlign="justify">
                        If the product has not been redeemed early, but at maturity the underlying
                        remains above the protection barrier, the investor is reimbursed at 100% of
                        the invested capital and receives all due coupons.
                        This scenario provides a balanced outcome with limited risk.
                      </Text>
                    </Box>
                  </HStack>

                  <HStack align="center" gap={8} w="100%" flexDir={{ base: "column", md: "row" }}>
                    <Image
                      src="/autocall/autocall-3.gif"
                      alt="Capital loss scenario"
                      borderRadius="lg"
                      boxShadow="lg"
                      maxW="600px"
                      w="100%"
                      objectFit="cover"
                    />
                    <Box>
                      <Heading size="md" color="colors.black">Scenario 3 – Capital Loss</Heading>
                      <Text mt={2} fontSize="md" color="white" textAlign="justify">
                        If, at maturity, the underlying falls below the protection barrier,
                        the investor bears the loss in proportion to the decline of the underlying.
                        In this case, no coupon is paid, and the capital invested is partially or
                        totally lost depending on market performance.
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </VStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root >
  )
}