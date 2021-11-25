import React, { useState, useEffect } from "react";
import { Box, Flex, Wrap } from "@chakra-ui/react";

import Head from "./components/head";
import Sql from "./components/sql";
import Table from "./components/table";
import Database from "./components/database";
import { get, post } from "./services/index";

function App() {
  const numberToArray = (num) => {
    return Array.from(Array(num).keys());
  };

  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);

  const [tables, setTables] = useState([]);

  const getDatabase = () => {
    get("databes")
      .then((res) => {
        if (res.status) setDatabases(res.datas);
      })
      .catch((err) => {
        setDatabases([]);
      });
  };

  useEffect(() => {
    getDatabase();
  }, []);

  return (
    <Box p={5} px={10}>
      <Head />

      <Box border="1px" borderColor="gray.500" borderRadius={10}>
        <Flex>
          <Box p="4" borderColor="gray.500" borderRight="1px" w="20%">
            <Database
              databases={databases}
              defaultValue={selectedDatabase}
              onChange={(e) => setSelectedDatabase(e)}
            />
          </Box>

          <Box p="4" w="80%">
            <Box></Box>

            <Flex>
              <Wrap>
                {tables.length > 0 &&
                  numberToArray(10).map((item, index) => <Table key={index} />)}
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
