import React from "react";
import {
  Box,
  Button,
  Spacer,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Code,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  // return number to arrat function
  const numberToArray = (num) => {
    return Array.from(Array(num).keys());
  };

  return (
    <Box p={5} px={10}>
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

      <Box border="1px" borderColor="gray.500" borderRadius={10}>
        <Flex>
          <Box p="4" borderColor="gray.500" borderRight="1px" w="25%">
            <RadioGroup defaultValue="1">
              <Stack spacing={5} direction="column">
                <Radio colorScheme="green" value="1">
                  db name 1
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Spacer />
          <Box p="4" w="75%">
            <Box></Box>

            <Flex>
              <Wrap>
                {numberToArray(10).map((item) => (
                  <Box
                    key={item}
                    w="24%"
                    p="2"
                    borderRadius="10px"
                    border="1px"
                    borderColor="gray.700"
                    bg="gray.900"
                    as={WrapItem}
                  >
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Table Name</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>
                            <Checkbox
                              size="sm"
                              colorScheme="green"
                              defaultIsChecked
                            >
                              column_name_1
                            </Checkbox>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Checkbox size="sm" colorScheme="green">
                              column_name_2
                            </Checkbox>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Checkbox
                              size="sm"
                              colorScheme="green"
                              defaultIsChecked
                            >
                              column_name_3
                            </Checkbox>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                ))}
              </Wrap>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box mt="10">
        <Code p="5" borderRadius="10px" w="100%">
          <Box>
            CREATE VIEW{" "}
            <Input placeholder="view_name" mx="5" size="xs" w="150px" /> AS
          </Box>
          <Box>
            <SyntaxHighlighter language="sql" style={atomOneDark}>
              {`SELECT * FROM table_name`}
            </SyntaxHighlighter>
          </Box>
        </Code>
      </Box>
    </Box>
  );
}

export default App;
