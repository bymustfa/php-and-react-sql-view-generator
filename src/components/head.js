import React from "react";
import { Box, Button, Spacer, Flex, Heading } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";

export default function Head() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box border="1px" borderColor="gray.500" mb={6} borderRadius={10}>
      <Flex alignItems="center">
        <Box p="4">
          <Heading size="md">Create View Generator</Heading>
        </Box>
        <Spacer />

        <Box pr={2}>
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
