import React from "react";
import { Box, Button, Code, Input } from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Play } from "./icons";

export default function Sql({ code }) {
  return (
    <Box mt="10" position="relative">
      <Code p="5" borderRadius="10px" w="100%">
        <Box>
          CREATE VIEW
          <Input placeholder="view_name" mx="5" size="xs" w="150px" /> AS
        </Box>
        <Box>
          <SyntaxHighlighter language="sql" style={atomOneDark}>
            {code}
          </SyntaxHighlighter>
        </Box>
      </Code>

      <Button
        colorScheme="teal"
        position="absolute"
        right="1"
        top="1"
        color="gray.800"
        _hover={{ color: "white" }}
        size="sm"
        rightIcon={<Play />}
      >
        Run
      </Button>
    </Box>
  );
}
