import React, { useEffect, useState } from "react";
import { Box, Button, Code, Input, useClipboard } from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Play, Copy } from "./icons";

export default function Sql({ selectedColumns, tableName = "" }) {
  const [sqlCode, setSql] = useState("");
  const [runSqlCode, setRunSqlCode] = useState("");
  const { hasCopied, onCopy } = useClipboard(runSqlCode);

  const [viewName, setViewName] = useState("");

  useEffect(() => {
    console.log(tableName);

    const code = `
    SELECT 
        ${selectedColumns.join(", \n \t")} 
    FROM ${tableName}
        `;

    setSql(code);

    setRunSqlCode(`   CREATE VIEW ${viewName} AS ${code} `);
  }, [selectedColumns, tableName, viewName]);

  return (
    <Box
      mt="10"
      position="relative"
      style={{ background: "#282C34" }}
      borderRadius="10px"
      border="1px"
      borderColor="gray.500"
    >
      <Code
        p="5"
        w="100%"
        style={{ background: "#282C34" }}
        borderRadius="10px"
      >
        <Box style={{ background: "#282C34" }}>
          CREATE VIEW
          <Input
            placeholder="view_name"
            mx="5"
            size="xs"
            w="150px"
            onChange={(e) => setViewName(e.target.value)}
            value={viewName}
          />{" "}
          AS
        </Box>
        <Box>
          <SyntaxHighlighter language="sql" style={atomOneDark}>
            {sqlCode}
          </SyntaxHighlighter>
        </Box>
      </Code>

      <Button
        colorScheme="teal"
        variant="outline"
        position="absolute"
        right="100"
        top="1"
        _hover={{ color: "white" }}
        size="sm"
        rightIcon={<Copy />}
        onClick={onCopy}
        isDisabled={
          viewName.trim().length === 0 ||
          sqlCode.trim().length === 0 ||
          tableName.trim().length === 0
        }
      >
        {hasCopied ? "Copied" : "Copy"}
      </Button>

      <Button
        colorScheme="teal"
        position="absolute"
        right="1"
        top="1"
        color="gray.800"
        _hover={{ color: "white" }}
        size="sm"
        rightIcon={<Play />}
        isDisabled={
          viewName.trim().length === 0 ||
          sqlCode.trim().length === 0 ||
          tableName.trim().length === 0
        }
      >
        Run
      </Button>
    </Box>
  );
}
