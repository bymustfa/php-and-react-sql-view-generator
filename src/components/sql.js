import React from "react";
import {
  Box,
  Button,
  Code,
  Input,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Sql({ code }) {
  return (
    <Box mt="10">
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

      <Button mr="-px">
        Run <AddIcon ml="2" />
      </Button>
    </Box>
  );
}
