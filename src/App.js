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
  Checkbox,
  Wrap,
  WrapItem,
  IconButton,
} from "@chakra-ui/react";

import Head from "./components/head";
import Sql from "./components/sql";
import Table from "./components/table";
import Database from "./components/database";

function App() {
  const numberToArray = (num) => {
    return Array.from(Array(num).keys());
  };

  return (
    <Box p={5} px={10}>
      <Head />

      <Box border="1px" borderColor="gray.500" borderRadius={10}>
        <Flex>
          <Box p="4" borderColor="gray.500" borderRight="1px" w="20%">
            <Database />
          </Box>

          <Box p="4" w="80%">
            <Box></Box>

            <Flex>
              <Wrap>
                {numberToArray(10).map((item, index) => (
                  <Table key={index} />
                ))}
              </Wrap>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Sql code="SELECT * FROM table_name " />
    </Box>
  );
}

export default App;
